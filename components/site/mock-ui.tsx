import type { ReactNode } from "react";
import {
  Cancel01Icon,
  CheckmarkCircle02Icon,
  File01Icon,
  Search01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import type { ModuleId } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Icon } from "./primitives";

/* ---------- Petites briques des aperçus ---------- */

export function Sheet({ title, badge, children }: { title: string; badge?: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-[22px] border bg-surface-solid p-4 shadow-[0_24px_50px_-30px_rgba(15,23,42,0.45)] sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-[15px] font-medium tracking-[-0.01em]">{title}</p>
        {badge && (
          <span className="rounded-[200px] bg-brand/12 px-2.5 py-1 text-[13px] whitespace-nowrap text-accent-text">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-t py-2.5 text-[15px]",
        strong && "font-medium",
      )}
    >
      <span className={strong ? "" : "text-muted"}>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

export function Pill({ tone = "neutral", children }: { tone?: "ok" | "off" | "neutral"; children: ReactNode }) {
  return (
    <span
      className={cn(
        "rounded-[200px] px-2.5 py-1 text-[13px] whitespace-nowrap",
        tone === "ok" && "bg-brand/12 text-accent-text",
        tone === "off" && "bg-ink text-white dark:bg-white/12",
        tone === "neutral" && "bg-surface-sunken text-muted",
      )}
    >
      {children}
    </span>
  );
}

/* ---------- Un aperçu par module (données fictives) ---------- */

export const PREVIEWS: Record<ModuleId, ReactNode> = {
  eleves: (
    <Sheet title="Dossier élève" badge="Inscrit">
      <div className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-brand text-white">AK</span>
        <div>
          <p className="text-lg leading-tight tracking-[-0.02em]">Ama Kossi</p>
          <p className="text-[15px] text-muted">6e A, matricule 2025-0142</p>
        </div>
      </div>
      <div className="mt-4">
        <Row label="Extrait de naissance" value="Reçu" />
        <Row label="Photo d’identité" value="Reçue" />
        <Row label="Bulletin précédent" value="Reçu" />
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-3">
        <Pill>Import CSV</Pill>
        <Pill>Passage de classe</Pill>
        <Pill>Réaffectation</Pill>
      </div>
    </Sheet>
  ),
  bulletins: (
    <Sheet title="Bulletin, 1er trimestre" badge="Figé">
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 pb-2 text-[13px] text-muted">
        <span>Matière</span>
        <span>Coef.</span>
        <span>Note</span>
      </div>
      {[
        ["Mathématiques", "4", "14,50"],
        ["Français", "4", "12,00"],
        ["SVT", "2", "15,00"],
      ].map(([matter, coef, note]) => (
        <div key={matter} className="grid grid-cols-[1fr_auto_auto] gap-x-6 border-t py-2.5 text-[15px] tabular-nums">
          <span>{matter}</span>
          <span className="w-7 text-center text-muted">{coef}</span>
          <span>{note}</span>
        </div>
      ))}
      <div className="mt-auto flex items-center justify-between gap-3 rounded-[16px] bg-brand px-4 py-3 text-white">
        <span className="text-[15px]">Moyenne pondérée</span>
        <span className="text-xl tracking-[-0.02em] tabular-nums">13,60 / 20</span>
      </div>
      <p className="mt-2.5 text-[14px] text-muted">Mention : Assez bien</p>
    </Sheet>
  ),
  tresorerie: (
    <Sheet title="Reçu n° 000124" badge="Tranche 2 / 3">
      <Row label="Écolage, 6e A" value="45 000 FCFA" />
      <Row label="Mode de paiement" value="Flooz" />
      <Row label="Reste à payer" value="30 000 FCFA" />
      <div className="mt-auto rounded-[16px] bg-surface-sunken p-3.5">
        <div className="barcode h-12 text-foreground" aria-hidden />
        <p className="mt-2 flex items-center gap-1.5 text-[14px] text-muted">
          <Icon icon={CheckmarkCircle02Icon} size={16} className="text-accent-text" />
          Code de vérification anti-falsification
        </p>
      </div>
    </Sheet>
  ),
  presences: (
    <Sheet title="Appel, 6e A" badge="Matin">
      {(
        [
          ["Ama Kossi", "Présente", "ok"],
          ["Kodjo Mensah", "Présent", "ok"],
          ["Afi Lawson", "Excusée", "neutral"],
          ["Yao Agbeko", "Absent", "off"],
          ["Essi Tchala", "Présente", "ok"],
        ] as const
      ).map(([name, status, tone]) => (
        <div key={name} className="flex items-center justify-between gap-3 border-t py-2.5 text-[15px]">
          <span>{name}</span>
          <Pill tone={tone}>{status}</Pill>
        </div>
      ))}
    </Sheet>
  ),
  paie: (
    <Sheet title="Bulletin de paie" badge="À décaisser">
      <Row label="Salaire de base" value="180 000 FCFA" />
      <Row label="Prime d’ancienneté" value="15 000 FCFA" />
      <Row label="CNSS" value="- 7 800 FCFA" />
      <Row label="ITS" value="- 6 200 FCFA" />
      <div className="mt-auto flex items-center justify-between gap-3 rounded-[16px] bg-brand px-4 py-3 text-white">
        <span className="text-[15px]">Net à payer</span>
        <span className="text-xl tracking-[-0.02em] tabular-nums">181 000 FCFA</span>
      </div>
    </Sheet>
  ),
  documents: (
    <Sheet title="Archives">
      <div className="mb-3 flex items-center gap-2 rounded-[200px] bg-surface-sunken px-3.5 py-2.5 text-[15px] text-muted">
        <Icon icon={Search01Icon} size={18} />
        Rechercher un document
      </div>
      {[
        ["Certificat de scolarité", "certificat"],
        ["Attestation d’inscription", "attestation"],
        ["Relevé de notes", "scolarité"],
      ].map(([name, tag]) => (
        <div key={name} className="flex items-center gap-3 border-t py-2.5 text-[15px]">
          <Icon icon={File01Icon} size={18} className="shrink-0 text-accent-text" />
          <span className="min-w-0 flex-1 truncate">{name}</span>
          <Pill>{tag}</Pill>
        </div>
      ))}
      <p className="mt-auto pt-2 text-[14px] text-muted">Sauvegarde quotidienne, stockage S3/R2</p>
    </Sheet>
  ),
  "securite-module": (
    <Sheet title="Permissions par rôle" badge="2FA activée">
      <div className="grid grid-cols-[1fr_repeat(4,2.75rem)] items-center text-center text-[13px] text-muted max-sm:grid-cols-[1fr_repeat(4,2.35rem)] max-sm:text-[12px]">
        <span className="pb-2 text-left">Rôle</span>
        <span className="pb-2">Voir</span>
        <span className="pb-2">Créer</span>
        <span className="pb-2">Modif.</span>
        <span className="pb-2">Suppr.</span>
        {(
          [
            ["Administrateur", [1, 1, 1, 1]],
            ["Directeur", [1, 1, 1, 0]],
            ["Enseignant", [1, 1, 0, 0]],
            ["Comptabilité", [1, 1, 1, 0]],
            ["Secrétariat", [1, 1, 0, 0]],
          ] as const
        ).map(([role, rights]) => (
          <div key={role} className="col-span-full grid grid-cols-subgrid items-center border-t py-2.5 text-[15px] text-foreground">
            <span className="truncate text-left">{role}</span>
            {rights.map((allowed, i) => (
              <span key={i} className="flex justify-center">
                <Icon
                  icon={allowed ? Tick02Icon : Cancel01Icon}
                  size={17}
                  className={allowed ? "text-accent-text" : "text-muted/50"}
                />
                <span className="sr-only">{allowed ? "autorisé" : "non autorisé"}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </Sheet>
  ),
};

/* ---------- Aperçus propres à la page Fonctionnalités (données fictives) ---------- */

export const STATS_PREVIEW = (
  <Sheet title="Statistiques" badge="2025-2026">
    <div className="mb-3 flex flex-wrap gap-2">
      <Pill>Année</Pill>
      <Pill>Classe</Pill>
      <Pill>Sexe</Pill>
    </div>
    <Row label="Indice de parité (IPS)" value="0,98" />
    <Row label="Taux de redoublement" value="6 %" />
    <Row label="Réussite interne" value="84 %" />
    <Row label="Recouvrement de l’écolage" value="97 %" />
    <Row label="Ratio élèves/enseignant" value="32" />
    <div className="mt-auto flex flex-wrap gap-2 pt-3">
      <Pill tone="ok">Export PDF</Pill>
      <Pill tone="ok">Export Excel</Pill>
    </div>
  </Sheet>
);

export const FAMILY_PREVIEW = (
  <Sheet title="Portail famille" badge="Lecture seule">
    <div className="flex items-center gap-3">
      <span className="flex size-12 items-center justify-center rounded-full bg-brand text-white">AK</span>
      <div>
        <p className="text-lg leading-tight tracking-[-0.02em]">Ama Kossi</p>
        <p className="text-[15px] text-muted">6e A</p>
      </div>
    </div>
    <div className="mt-4">
      <Row label="Moyenne" value="13,60 / 20" />
      <Row label="Assiduité" value="96 %" />
      <Row label="Solde de l’écolage" value="30 000 FCFA" />
      <Row label="Dernier bulletin" value="1er trimestre, PDF" />
    </div>
  </Sheet>
);
