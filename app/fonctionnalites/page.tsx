import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Analytics02Icon,
  Archive01Icon,
  ArrowRight01Icon,
  Calendar03Icon,
  Certificate01Icon,
  ChartBarLineIcon,
  CheckListIcon,
  Clock01Icon,
  CloudUploadIcon,
  DatabaseSyncIcon,
  DashboardSquare01Icon,
  Invoice03Icon,
  Mortarboard02Icon,
  School01Icon,
  SecurityCheckIcon,
  ServerStack01Icon,
  Tick02Icon,
  UserCheck01Icon,
  UserGroupIcon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { CtaBlock } from "@/components/site/final-cta";
import { FAMILY_PREVIEW, PREVIEWS, STATS_PREVIEW } from "@/components/site/mock-ui";
import { PageHero } from "@/components/site/page-hero";
import { PageProgress } from "@/components/site/page-progress";
import { Container, Eyebrow, Icon, Reveal, ScrollTitle } from "@/components/site/primitives";
import { COVERAGE, FEATURE_CHAPTERS, FEATURE_SECTIONS } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Fonctionnalités",
  description:
    "Inscriptions, notes, bulletins, examens officiels, écolage, présences, documents et portail familles : Dalibi couvre toute la vie scolaire, sans logiciel tiers.",
};

const CHAPTER_ICONS: Record<(typeof FEATURE_CHAPTERS)[number]["id"], IconSvgElement> = {
  pilotage: DashboardSquare01Icon,
  statistiques: Analytics02Icon,
  pedagogie: Mortarboard02Icon,
  finances: Invoice03Icon,
  familles: UserMultiple02Icon,
  securite: SecurityCheckIcon,
};

const CHAPTER_VISUALS: Record<(typeof FEATURE_CHAPTERS)[number]["id"], ReactNode> = {
  pilotage: (
    <Image
      src="/dalibi-showcase-tablet.png"
      alt="Tableau de bord Dalibi : facturation, encaissements, élèves inscrits, présences et examens officiels"
      width={1362}
      height={941}
      sizes="(max-width: 1024px) 94vw, 640px"
      className="h-auto w-full rounded-[18px]"
    />
  ),
  statistiques: STATS_PREVIEW,
  pedagogie: PREVIEWS.bulletins,
  finances: PREVIEWS.tresorerie,
  familles: FAMILY_PREVIEW,
  securite: PREVIEWS["securite-module"],
};

const COVERAGE_ICONS = [
  Analytics02Icon,
  UserGroupIcon,
  School01Icon,
  Clock01Icon,
  UserCheck01Icon,
  CheckListIcon,
  ChartBarLineIcon,
  Certificate01Icon,
  Archive01Icon,
  Calendar03Icon,
  CloudUploadIcon,
  DatabaseSyncIcon,
  ServerStack01Icon,
];

export default function FeaturesPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow={
            <>
              <Icon icon={Tick02Icon} size={18} className="text-accent-text" />
              Sans logiciel tiers
            </>
          }
          lines={[{ text: "Tout ce qu’il faut" }, { text: "pour", accent: "gérer votre école" }]}
          description="Inscriptions, notes, bulletins, examens officiels, écolage, présences, documents et portail familles : Dalibi couvre toute la vie scolaire, sans logiciel tiers."
        >
          <nav aria-label="Chapitres de la page" className="flex flex-wrap gap-2">
            {FEATURE_CHAPTERS.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className="glass inline-flex items-center gap-2 rounded-[200px] py-2 pl-2.5 pr-4 text-base transition-colors hover:text-accent-text"
              >
                <Icon icon={CHAPTER_ICONS[chapter.id]} size={19} className="text-accent-text" />
                {chapter.eyebrow}
              </a>
            ))}
            <a
              href="#couverture"
              className="glass inline-flex items-center rounded-[200px] px-4 py-2 text-base transition-colors hover:text-accent-text"
            >
              Et bien plus
            </a>
          </nav>
        </PageHero>

        {FEATURE_CHAPTERS.map((chapter, index) => {
          const flipped = index % 2 === 1;
          return (
            <section key={chapter.id} id={chapter.id} className="scroll-mt-28 pt-28 sm:pt-40">
              <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={cn(flipped && "lg:order-2")}>
                  <Eyebrow>{chapter.eyebrow}</Eyebrow>
                  <ScrollTitle
                    text={chapter.title}
                    accent={[...chapter.accent]}
                    className="text-[clamp(2.2rem,4.2vw,3.5rem)] leading-[1.07]"
                  />
                  <Reveal>
                    <p className="mt-5 text-[clamp(1.0625rem,1.4vw,1.2rem)] leading-[1.5] text-muted">
                      {chapter.intro}
                    </p>
                  </Reveal>
                  <ul className="mt-7 flex flex-col gap-3.5">
                    {chapter.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[17px] leading-[1.45]">
                        <Icon icon={Tick02Icon} size={20} className="mt-0.5 shrink-0 text-accent-text" />
                        <span className="text-foreground/85">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Reveal className={cn(flipped && "lg:order-1")}>
                  <div className="glass rounded-[28px] p-2.5 sm:rounded-[36px] sm:p-4">
                    {CHAPTER_VISUALS[chapter.id]}
                  </div>
                </Reveal>
              </Container>
            </section>
          );
        })}

        <Container>
          <p className="mt-10 text-center text-[14px] text-muted">
            Aperçus illustratifs, données fictives.
          </p>
        </Container>

        <section id="couverture" className="scroll-mt-28 pt-28 sm:pt-40">
          <Container>
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-end">
              <div>
                <Eyebrow>Et bien plus encore</Eyebrow>
                <ScrollTitle
                  text="Une couverture complète de la vie scolaire"
                  accent={["couverture", "complète"]}
                  className="text-[clamp(2.4rem,5.4vw,4.5rem)] leading-[1.05]"
                />
              </div>
              <Reveal>
                <p className="text-[clamp(1.0625rem,1.4vw,1.2rem)] leading-[1.5] text-muted">
                  Chaque besoin administratif, pédagogique et financier trouve
                  sa réponse dans Dalibi.
                </p>
              </Reveal>
            </div>

            <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {COVERAGE.map((item, i) => (
                <li
                  key={item.title}
                  className={cn(
                    i === 0 && "md:col-span-2",
                    i === COVERAGE.length - 1 && "lg:col-span-2",
                  )}
                >
                  <Reveal delay={(i % 3) * 0.05} className="h-full">
                    <div
                      className={cn(
                        "h-full rounded-[28px] p-6 sm:p-7",
                        i === 0 || i === COVERAGE.length - 1
                          ? "bg-ink text-white ring-1 ring-white/8"
                          : "glass",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-11 items-center justify-center rounded-full",
                          i === 0 || i === COVERAGE.length - 1
                            ? "bg-brand text-white"
                            : "bg-brand/12 text-accent-text",
                        )}
                      >
                        <Icon icon={COVERAGE_ICONS[i]} size={21} />
                      </span>
                      <h3 className="mt-5 text-[1.35rem] leading-[1.2] tracking-[-0.025em]">
                        {item.title}
                      </h3>
                      <ul className="mt-3 flex flex-col gap-1.5">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            className={cn(
                              "text-base leading-[1.45]",
                              i === 0 || i === COVERAGE.length - 1 ? "text-white/75" : "text-muted",
                            )}
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal className="mt-10 flex justify-center">
              <Link
                href="/documentation#modules"
                className="group inline-flex items-center gap-1.5 text-lg underline-offset-4 hover:underline"
              >
                Voir le détail des modules dans la documentation
                <Icon
                  icon={ArrowRight01Icon}
                  size={20}
                  className="text-accent-text transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </Container>
        </section>

        <CtaBlock
          title="Prêt à équiper votre école ?"
          accent={["équiper"]}
          text="Découvrez Dalibi en conditions réelles avec une démonstration adaptée à votre établissement."
          primary={{ label: "Demander une démo", href: "/contact?sujet=demo" }}
          secondary={{ label: "Voir les tarifs", href: "/tarifs" }}
        />
      </main>
      <PageProgress sections={FEATURE_SECTIONS} />
    </>
  );
}
