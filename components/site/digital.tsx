import {
  ArrowRight02Icon,
  Calculator01Icon,
  Clock01Icon,
  Coins01Icon,
  SmileIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { BENEFITS, DEMO_MAILTO } from "@/lib/content";
import { Container, Eyebrow, Icon, PbButton, Reveal, ScrollTitle } from "./primitives";

const ICONS = [Clock01Icon, Calculator01Icon, Coins01Icon, SmileIcon, SparklesIcon];

export function Digital() {
  return (
    <section id="numerique" className="scroll-mt-28 pt-28 sm:pt-44">
      <Container>
        <Eyebrow>Passez au numérique</Eyebrow>
        <ScrollTitle
          text="Faites entrer votre école dans l’ère du numérique"
          accent={["numérique"]}
          className="max-w-[1060px] text-[clamp(2.5rem,6.4vw,5.25rem)] leading-[1.04]"
        />
        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <Reveal>
            <p className="max-w-[640px] text-[clamp(1.125rem,1.6vw,1.3rem)] leading-[1.5] text-muted">
              Dites adieu aux registres papier et aux calculs interminables :
              avec Dalibi, vous digitalisez toute la gestion de votre
              établissement et vous gagnez un temps précieux.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <PbButton href={DEMO_MAILTO} icon={ArrowRight02Icon}>
              Lancer la digitalisation de mon école
            </PbButton>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-5">
          {BENEFITS.map((benefit, i) => (
            <li key={benefit.title}>
              <Reveal delay={i * 0.06} className="h-full border-t pt-5">
                <Icon icon={ICONS[i]} size={26} className="text-accent-text" />
                <h3 className="mt-8 text-[1.3rem] leading-[1.2] tracking-[-0.02em]">
                  {benefit.title}
                </h3>
                <p className="mt-2.5 text-base leading-[1.5] text-muted">
                  {benefit.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
