import { ArrowRight01Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { DEMO_MAILTO, GITHUB_URL } from "@/lib/content";
import { Container, Icon, PbButton, Reveal, ScrollTitle } from "./primitives";

/** Dernier appel à l’action, commun à toutes les pages. */
export function CtaBlock({
  title,
  accent,
  text,
  primary,
  secondary,
}: {
  title: string;
  accent: string[];
  text: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  const linkClass =
    "group inline-flex items-center gap-1.5 text-lg underline-offset-4 hover:underline";
  const linkInner = secondary && (
    <>
      {secondary.label}
      <Icon
        icon={ArrowRight01Icon}
        size={20}
        className="text-accent-text transition-transform group-hover:translate-x-1"
      />
    </>
  );

  return (
    <section className="pt-28 pb-24 sm:pt-44 sm:pb-36">
      <Container className="flex flex-col items-center text-center">
        <ScrollTitle
          text={title}
          accent={accent}
          className="max-w-[1000px] text-[clamp(2.6rem,6.6vw,5.5rem)] leading-[1.03]"
        />
        <Reveal>
          <p className="mx-auto mt-6 max-w-[580px] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.5] text-muted">
            {text}
          </p>
        </Reveal>
        <Reveal className="mt-10 flex w-full flex-col items-center gap-6">
          <PbButton href={primary.href} icon={ArrowRight02Icon}>
            {primary.label}
          </PbButton>
          {secondary &&
            (secondary.href.startsWith("/") ? (
              <Link href={secondary.href} className={linkClass}>
                {linkInner}
              </Link>
            ) : (
              <a href={secondary.href} target="_blank" rel="noreferrer" className={linkClass}>
                {linkInner}
              </a>
            ))}
        </Reveal>
      </Container>
    </section>
  );
}

export function FinalCta() {
  return (
    <CtaBlock
      title="Prêt à moderniser votre établissement ?"
      accent={["moderniser"]}
      text="Demandez une démo personnalisée, ou explorez le code : Dalibi est open source et auto-hébergeable."
      primary={{ label: "Demander une démo", href: DEMO_MAILTO }}
      secondary={{ label: "Voir le dépôt GitHub", href: GITHUB_URL }}
    />
  );
}
