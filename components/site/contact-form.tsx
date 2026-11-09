"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Icon } from "./primitives";

const CONTACT_EMAIL = "contact@dalibi.app";
const SUBJECTS: Record<string, string> = {
  demo: "Demande de démo",
  devis: "Devis d’accompagnement",
  support: "Support & questions",
};
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";
type Fields = Partial<Record<"name" | "email" | "message", string>>;

const INPUT =
  "w-full rounded-[18px] border bg-surface-solid/70 px-4 py-3.5 text-[17px] text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted/80 focus:border-brand focus:ring-4 focus:ring-brand/15 aria-invalid:border-[#c2410c] dark:aria-invalid:border-[#fb923c]";

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base">
        {label}
        {required && (
          <span className="text-accent-text" aria-hidden>
            {" "}*
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[15px] text-[#c2410c] dark:text-[#fdba74]">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Fields>({});
  const [subject, setSubject] = useState("");
  const [mailto, setMailto] = useState(`mailto:${CONTACT_EMAIL}`);
  const startedAt = useRef(0);
  const form = useRef<HTMLFormElement>(null);

  // Le chrono anti-robot démarre à l’affichage, ?sujet=demo pré-remplit le sujet
  useEffect(() => {
    startedAt.current = Date.now();
    const preset = new URLSearchParams(window.location.search).get("sujet");
    if (preset && SUBJECTS[preset]) setSubject(SUBJECTS[preset]);
  }, []);

  function validate(data: FormData) {
    const found: Fields = {};
    if (String(data.get("name") ?? "").trim().length < 2) found.name = "Indiquez votre nom complet.";
    if (!EMAIL.test(String(data.get("email") ?? "").trim())) found.email = "Indiquez une adresse e-mail valide.";
    if (String(data.get("message") ?? "").trim().length < 10)
      found.message = "Décrivez votre besoin en quelques mots (10 caractères minimum).";
    return found;
  }

  function focusFirst(found: Fields) {
    const first = (["name", "email", "message"] as const).find((key) => found[key]);
    if (first) form.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const found = validate(data);
    setFields(found);
    if (Object.keys(found).length) {
      setStatus("idle");
      focusFirst(found);
      return;
    }

    const value = (key: string) => String(data.get(key) ?? "").trim();
    // Secours si l’envoi échoue : le visiteur retrouve son message dans son logiciel de messagerie
    setMailto(
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(value("subject") || "Contact Dalibi")}&body=${encodeURIComponent(
        `${value("message")}\n\n${value("name")}${value("school") ? `, ${value("school")}` : ""}`,
      )}`,
    );

    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value("name"),
          email: value("email"),
          school: value("school"),
          subject: value("subject"),
          message: value("message"),
          company: data.get("company"),
          startedAt: startedAt.current,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(result?.error ?? "Une erreur est survenue.");
        if (result?.fields) {
          setFields(result.fields);
          focusFirst(result.fields);
        }
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Impossible d’envoyer le message. Vérifiez votre connexion.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="glass rounded-[32px] p-8 text-center sm:p-12">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand text-white">
          <Icon icon={CheckmarkCircle02Icon} size={30} />
        </span>
        <h2 className="mt-6 text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.03em]">
          Message envoyé !
        </h2>
        <p className="mx-auto mt-3 max-w-[420px] text-[17px] leading-[1.5] text-muted">
          Merci pour votre intérêt. Notre équipe vous recontacte au plus vite.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="glass rounded-[32px] p-5 sm:p-9">
      {/* Champ piège : invisible pour un humain, rempli par les robots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Ne pas remplir
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Nom complet" required error={fields.name}>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Votre nom"
            aria-invalid={!!fields.name}
            aria-describedby={fields.name ? "name-error" : undefined}
            className={INPUT}
          />
        </Field>
        <Field id="email" label="E-mail" required error={fields.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="vous@exemple.com"
            aria-invalid={!!fields.email}
            aria-describedby={fields.email ? "email-error" : undefined}
            className={INPUT}
          />
        </Field>
        <Field id="school" label="Établissement">
          <input
            id="school"
            name="school"
            autoComplete="organization"
            placeholder="Nom de votre école"
            className={INPUT}
          />
        </Field>
        <Field id="subject" label="Sujet">
          <input
            id="subject"
            name="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="Demande de démo, question…"
            className={INPUT}
          />
        </Field>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2" role="group" aria-label="Choisir un sujet">
        {Object.values(SUBJECTS).map((label) => (
          <button
            key={label}
            type="button"
            aria-pressed={subject === label}
            onClick={() => setSubject(label)}
            className={cn(
              "cursor-pointer rounded-[200px] border px-3.5 py-1.5 text-[15px] transition-colors",
              subject === label
                ? "border-brand bg-brand text-white"
                : "bg-surface-sunken text-foreground/85 hover:text-accent-text",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <Field id="message" label="Message" required error={fields.message}>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={6}
            placeholder="Décrivez votre besoin (établissement, nombre d’élèves, objectifs…)"
            aria-invalid={!!fields.message}
            aria-describedby={fields.message ? "message-error" : undefined}
            className={cn(INPUT, "resize-y")}
          />
        </Field>
      </div>

      {status === "error" && (
        <div role="alert" className="mt-5 rounded-[18px] border border-[#d9882b]/40 bg-[#d9882b]/10 p-4 text-base leading-[1.5]">
          <p>{error}</p>
          <a href={mailto} className="mt-1 inline-flex items-center gap-1.5 text-accent-text underline underline-offset-4">
            <Icon icon={Mail01Icon} size={18} />
            Écrire à {CONTACT_EMAIL}
          </a>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center">
        <button type="submit" disabled={sending} className="pb-ai-button shrink-0">
          <span>{sending ? "Envoi…" : "Envoyer le message"}</span>
          {!sending && (
            <span>
              <Icon icon={ArrowRight02Icon} size={22} />
            </span>
          )}
        </button>
        <p className="text-[15px] leading-[1.4] text-muted">
          Vos informations servent uniquement à traiter votre demande et ne sont jamais revendues.
        </p>
      </div>
    </form>
  );
}
