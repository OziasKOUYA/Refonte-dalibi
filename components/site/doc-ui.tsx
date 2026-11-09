import type { ReactNode } from "react";
import {
  Alert02Icon,
  InformationCircleIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { CodeBlock } from "@/components/ui/code-block";
import { DOC_CODE } from "@/lib/docs-code";
import { cn } from "@/lib/utils";
import { Icon } from "./primitives";

/** Une section de la documentation, ancrée pour le sommaire. */
export function DocSection({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t pt-12 first:border-t-0 first:pt-0">
      <p className="text-[15px] text-accent-text">{kicker}</p>
      <h2 className="mt-2 text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.1] tracking-[-0.03em]">{title}</h2>
      <div className="mt-6 flex flex-col gap-5">{children}</div>
    </section>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-5 text-[clamp(1.35rem,2vw,1.6rem)] leading-[1.2] tracking-[-0.025em]">{children}</h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[17.5px] leading-[1.6] text-foreground/85">{children}</p>;
}

/** Code dans le texte. */
export function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-[6px] bg-surface-sunken px-1.5 py-0.5 font-mono text-[0.86em] break-words text-foreground">
      {children}
    </code>
  );
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="text-accent-text underline underline-offset-4"
    >
      {children}
    </a>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[17px] leading-[1.5]">
          <Icon icon={Tick02Icon} size={19} className="mt-1 shrink-0 text-accent-text" />
          <span className="min-w-0 text-foreground/85">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Callout({
  id,
  tone = "info",
  title,
  children,
}: {
  id?: string;
  tone?: "info" | "warn";
  title: string;
  children: ReactNode;
}) {
  return (
    <aside
      id={id}
      className={cn(
        "flex scroll-mt-28 gap-3.5 rounded-[22px] border p-5",
        tone === "warn" ? "border-[#d9882b]/35 bg-[#d9882b]/10" : "border-brand/25 bg-brand/8",
      )}
    >
      <Icon
        icon={tone === "warn" ? Alert02Icon : InformationCircleIcon}
        size={22}
        className={cn("mt-0.5 shrink-0", tone === "warn" ? "text-[#b96f19] dark:text-[#f0a858]" : "text-accent-text")}
      />
      <div className="min-w-0">
        <p className="text-[17px] font-medium tracking-[-0.01em]">{title}</p>
        <div className="mt-1 text-base leading-[1.55] text-foreground/85">{children}</div>
      </div>
    </aside>
  );
}

const LANGUAGE: Record<string, string> = {
  Terminal: "shell",
  crontab: "shell",
  ".env": "dotenv",
  "php artisan tinker": "tsx",
};

/**
 * Bloc de code Rare UI, aux couleurs du thème actif (voir --cb-* dans globals.css).
 * `i` désigne le bloc extrait de la documentation d’origine, le texte n’est jamais retapé.
 */
export function Code({ i, label }: { i: number; label: string }) {
  return (
    <CodeBlock
      code={DOC_CODE[i]}
      filename={label}
      language={LANGUAGE[label.split(" — ")[0]] ?? "text"}
      showLineNumbers={false}
      className="shadow-[0_14px_34px_-24px_rgba(15,23,42,0.4)]"
    />
  );
}

/** Étapes numérotées. */
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="flex flex-col gap-7">{children}</ol>;
}

export function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children?: ReactNode;
}) {
  return (
    <li className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3.5">
      <span className="flex size-9 items-center justify-center rounded-full bg-brand text-[15px] text-white">{n}</span>
      <div className="min-w-0">
        <h3 className="pt-1 text-[1.25rem] leading-[1.25] tracking-[-0.02em]">{title}</h3>
        {children && <div className="mt-3 flex flex-col gap-3.5">{children}</div>}
      </div>
    </li>
  );
}

export function Cards({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 }) {
  return <div className={cn("grid gap-3", cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>{children}</div>;
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="glass rounded-[22px] p-5">
      <h3 className="text-[1.15rem] tracking-[-0.02em]">{title}</h3>
      <div className="mt-2 text-base leading-[1.5] text-muted">{children}</div>
    </div>
  );
}
