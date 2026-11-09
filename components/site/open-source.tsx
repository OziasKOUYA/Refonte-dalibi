import {
  CodeIcon,
  GitPullRequestIcon,
  Github01Icon,
  LicenseIcon,
  ServerStack01Icon,
  SquareLock02Icon,
} from "@hugeicons/core-free-icons";
import { GITHUB_URL, OPEN_SOURCE_POINTS, TECH_STACK } from "@/lib/content";
import { Container, Eyebrow, Icon, PbButton, Reveal, ScrollTitle } from "./primitives";

const ICONS = [LicenseIcon, ServerStack01Icon, SquareLock02Icon, GitPullRequestIcon];

export function OpenSource() {
  return (
    <section id="open-source" className="scroll-mt-24 pt-28 sm:pt-44">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
        <div>
          <Eyebrow>Open source</Eyebrow>
          <ScrollTitle
            text="Un logiciel libre, des données souveraines"
            accent={["libre,", "souveraines"]}
            className="text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.05]"
          />
          <Reveal>
            <p className="mt-6 max-w-[560px] text-[clamp(1.0625rem,1.4vw,1.2rem)] leading-[1.5] text-muted">
              Dalibi est open source sous licence GPL v3 et entièrement
              auto-hébergeable. Transparence du code, indépendance et contrôle
              total de vos données scolaires.
            </p>
          </Reveal>
          <Reveal className="mt-9">
            <PbButton href={GITHUB_URL} target="_blank" rel="noreferrer" icon={Github01Icon}>
              Explorer le code sur GitHub
            </PbButton>
          </Reveal>
        </div>

        <ul className="grid gap-x-8 gap-y-9 self-end sm:grid-cols-2">
          {OPEN_SOURCE_POINTS.map((point, i) => (
            <li key={point.title}>
              <Reveal delay={i * 0.06} className="h-full border-t pt-5">
                <Icon icon={ICONS[i]} size={25} className="text-accent-text" />
                <h3 className="mt-5 text-[1.25rem] leading-[1.2] tracking-[-0.02em]">{point.title}</h3>
                <p className="mt-2 text-base leading-[1.5] text-muted">{point.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="mt-24">
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-12">
            <h3 className="max-w-[560px] text-[clamp(1.5rem,2.6vw,2.15rem)] leading-[1.12] tracking-[-0.03em]">
              Construit avec des technologies open source éprouvées
            </h3>
            <p className="max-w-[460px] text-base leading-[1.5] text-muted">
              Une base moderne et robuste, sans dépendance propriétaire : vos
              données restent chez vous, sur une stack maintenue par de larges
              communautés.
            </p>
          </div>
        </Reveal>
      </Container>
      <div className="marquee mt-9 overflow-hidden py-3" aria-label={`Technologies : ${TECH_STACK.join(", ")}`} role="img">
        <div className="marquee-track" aria-hidden>
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="glass mr-3 inline-flex items-center gap-2.5 rounded-[200px] px-6 py-3.5 text-lg whitespace-nowrap"
            >
              <Icon icon={CodeIcon} size={19} className="text-accent-text" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
