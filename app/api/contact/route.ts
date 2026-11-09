import { NextResponse } from "next/server";

/*
 * Reçoit le formulaire de contact, le vérifie, puis le transmet à CONTACT_FORWARD_URL
 * (voir .env.example). Sans cette variable, la route répond 503 : le formulaire
 * propose alors l’e-mail direct au lieu d’annoncer un envoi qui n’a pas eu lieu.
 */

const MAX_BODY = 20_000;
const MIN_FILL_MS = 3_000; // en dessous, ce n’est pas un humain qui a rempli le formulaire
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;

const LIMITS = { name: 120, email: 200, school: 160, subject: 160, message: 5_000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Limite par instance : un garde-fou contre les envois en rafale, pas une protection absolue
const hits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > RATE_MAX;
}

const fail = (status: number, error: string, fields?: Record<string, string>) =>
  NextResponse.json({ error, fields }, { status });

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) return fail(413, "Votre message est trop long.");

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, "Requête invalide.");
  }

  const text = (key: keyof typeof LIMITS) => {
    const value = body[key];
    return typeof value === "string" ? value.trim().slice(0, LIMITS[key]) : "";
  };

  // Robot probable : on répond comme si tout allait bien, sans rien transmettre
  const startedAt = Number(body.startedAt);
  if (body.company || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const payload = {
    name: text("name"),
    email: text("email"),
    school: text("school"),
    subject: text("subject"),
    message: text("message"),
  };

  const fields: Record<string, string> = {};
  if (payload.name.length < 2) fields.name = "Indiquez votre nom complet.";
  if (!EMAIL.test(payload.email)) fields.email = "Indiquez une adresse e-mail valide.";
  if (payload.message.length < 10) fields.message = "Décrivez votre besoin en quelques mots (10 caractères minimum).";
  if (Object.keys(fields).length) return fail(422, "Certains champs sont à corriger.", fields);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (isRateLimited(ip)) {
    return fail(429, "Trop de messages envoyés. Réessayez dans quelques minutes.");
  }

  const target = process.env.CONTACT_FORWARD_URL;
  if (!target) {
    return fail(503, "L’envoi en ligne n’est pas disponible pour le moment.");
  }

  try {
    const response = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, company: "", startedAt }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(`[contact] transmission refusée : HTTP ${response.status}`);
      return fail(502, "Le message n’a pas pu être transmis.");
    }
  } catch (error) {
    console.error("[contact] transmission impossible :", error instanceof Error ? error.name : "erreur");
    return fail(502, "Le message n’a pas pu être transmis.");
  }

  return NextResponse.json({ ok: true });
}
