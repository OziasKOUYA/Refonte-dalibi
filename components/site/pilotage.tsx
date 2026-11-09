import Image from "next/image";
import {
  Analytics02Icon,
  ArrowRight02Icon,
  Award01Icon,
  BalanceScaleIcon,
  File01Icon,
  SmartPhone01Icon,
} from "@hugeicons/core-free-icons";
import { DEMO_MAILTO, INDICATORS } from "@/lib/content";
import { Container, Eyebrow, Icon, PbButton, Reveal, ScrollTitle } from "./primitives";

const ICONS = [BalanceScaleIcon, Award01Icon, SmartPhone01Icon, Analytics02Icon, File01Icon];

export function Pilotage() {
  return (
    <section id="pilotage" className="scroll-mt-24 pt-28 sm:pt-44">
      <Container>
        <div className="mx-auto max-w-[900px] text-center">
          <div className="flex justify-center">
            <Eyebrow>Statistiques & pilotage</Eyebrow>
          </div>
          <ScrollTitle
            text="Pilotez avec des chiffres, pas à l’aveugle"
            accent={["chiffres,"]}
            className="text-[clamp(2.4rem,5.4vw,4.5rem)] leading-[1.05]"
          />
          <Reveal>
            <p className="mt-6 text-[clamp(1.0625rem,1.4vw,1.2rem)] leading-[1.5] text-muted">
              Des indicateurs clairs : parité, réussite, finances, assiduité, et
              des comparaisons d’une année à l’autre, exportables pour
              vos conseils et le ministère.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
          <Reveal>
            <div className="glass rounded-[24px] p-2 sm:rounded-[34px] sm:p-3 min-[1400px]:-ml-16">
              <Image
                src="/dalibi-showcase-tablet.png"
                alt="Vue tablette du tableau de bord Dalibi avec les indicateurs de l’année scolaire 2025-2026"
                width={1362}
                height={941}
                loading="lazy"
                sizes="(max-width: 1024px) 94vw, 700px"
                className="h-auto w-full rounded-[18px] sm:rounded-[24px]"
              />
            </div>
          </Reveal>

          <div>
            <ul className="flex flex-col [&>li:first-child>div]:pt-0">
              {INDICATORS.map((item, i) => (
                <li key={item.title}>
                  <Reveal delay={i * 0.05} className="flex gap-4 border-b py-4.5">
                    <Icon icon={ICONS[i]} size={24} className="mt-0.5 shrink-0 text-accent-text" />
                    <div>
                      <h3 className="text-[1.2rem] leading-[1.2] tracking-[-0.02em]">{item.title}</h3>
                      <p className="mt-1.5 text-base leading-[1.45] text-muted">{item.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal className="mt-8">
              <PbButton href={DEMO_MAILTO} icon={ArrowRight02Icon}>
                Demander une démo
              </PbButton>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
