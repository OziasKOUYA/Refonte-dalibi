import {
  Calculator01Icon,
  CalendarCheckIn01Icon,
  Certificate01Icon,
  CloudSavingDone01Icon,
  Invoice03Icon,
  Pdf01Icon,
} from "@hugeicons/core-free-icons";
import { AUTOMATIONS } from "@/lib/content";
import { Container, Eyebrow, Icon, Reveal, ScrollTitle } from "./primitives";

const ICONS = [
  Pdf01Icon,
  Calculator01Icon,
  Invoice03Icon,
  CalendarCheckIn01Icon,
  CloudSavingDone01Icon,
  Certificate01Icon,
];

export function Automation() {
  return (
    <section id="automatisation" className="scroll-mt-28 pt-28 sm:pt-44">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Automatisation</Eyebrow>
          <ScrollTitle
            text="Automatisez vos processus scolaires en quelques clics"
            accent={["quelques", "clics"]}
            className="text-[clamp(2.4rem,4.6vw,3.9rem)] leading-[1.06]"
          />
          <Reveal>
            <p className="mt-6 max-w-[480px] text-[clamp(1.0625rem,1.4vw,1.2rem)] leading-[1.5] text-muted">
              Dalibi prend en charge les tâches répétitives et chronophages :
              vous vous concentrez sur l’essentiel, le logiciel
              s’occupe du reste.
            </p>
          </Reveal>
        </div>

        <ul className="[&>li:first-child>div]:pt-0">
          {AUTOMATIONS.map((item, i) => (
            <li key={item.title}>
              <Reveal
                delay={0.02 * i}
                className="group flex items-start gap-5 border-b py-7 sm:gap-7"
              >
                <span className="glass flex size-14 shrink-0 items-center justify-center rounded-full text-accent-text transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon icon={ICONS[i]} size={24} />
                </span>
                <div>
                  <h3 className="text-[clamp(1.35rem,2vw,1.7rem)] leading-[1.15] tracking-[-0.025em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[17px] leading-[1.5] text-muted">{item.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
