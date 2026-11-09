import type { Metadata } from "next";
import {
  ArrowRight02Icon,
  Github01Icon,
  LicenseIcon,
  ServerStack01Icon,
  Tick02Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { BrandFaq } from "@/components/site/faq-section";
import { CtaBlock } from "@/components/site/final-cta";
import { PageHero } from "@/components/site/page-hero";
import { PageProgress } from "@/components/site/page-progress";
import { Container, Eyebrow, Icon, PbButton, Reveal, ScrollTitle } from "@/components/site/primitives";
import {
  COMPARISON,
  FAQ_ITEMS,
  FREE_POINTS,
  GITHUB_URL,
  PLANS,
  PRICING_SECTIONS,
  SITE_URL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Dalibi est un logiciel libre : aucun frais de licence. Seul un accompagnement optionnel au déploiement et à la configuration peut faire l’objet d’un devis.",
};

const CONTACT = "/contact?sujet=devis";
const PRICING_FAQ = FAQ_ITEMS.filter((item) =>
  ["prix", "hors-ligne", "multi", "prerequis"].includes(item.id),
);

function Cell({ value, tone }: { value: string | true; tone?: "support" }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center">
        <Icon icon={Tick02Icon} size={20} className="text-accent-text" />
        <span className="sr-only">Inclus</span>
      </span>
    );
  }
  return <span className={tone === "support" ? "text-foreground" : "text-muted"}>{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow={
            <>
              <Icon icon={LicenseIcon} size={18} className="text-accent-text" />
              Licence GPL v3
            </>
          }
          lines={[{ text: "Open source," }, { text: "", accent: "et gratuit" }]}
          description="Dalibi est un logiciel libre : aucun frais de licence. Seul un accompagnement optionnel au déploiement et à la configuration peut faire l’objet d’un devis."
          aside={
            <div className="rounded-[32px] bg-ink p-7 text-white ring-1 ring-white/8 sm:p-8">
              <p className="text-base text-white/70">Frais de licence</p>
              <p className="mt-3 text-[clamp(3.25rem,6vw,4.75rem)] leading-none tracking-[-0.04em]">
                0&nbsp;FCFA
              </p>
              <p className="mt-5 border-t border-white/12 pt-5 text-[17px] leading-[1.45] text-white/80">
                Tous les modules inclus, sans limite d’élèves ni d’établissements.
              </p>
            </div>
          }
        />

        <section id="libre" className="scroll-mt-28 pt-28 sm:pt-40">
          <Container className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <Eyebrow>Avant tout, un logiciel libre</Eyebrow>
              <ScrollTitle
                text="Dalibi est open source et gratuit"
                accent={["open", "source", "gratuit"]}
                className="text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.05]"
              />
              <Reveal>
                <p className="mt-6 max-w-[620px] text-[clamp(1.0625rem,1.4vw,1.2rem)] leading-[1.5] text-muted">
                  Sous licence GPL v3, Dalibi appartient à la communauté. Vous
                  l’utilisez librement, sans frais et sans limite.
                </p>
              </Reveal>
              <ul className="mt-8 flex flex-col gap-3.5">
                {FREE_POINTS.map((point) => (
                  <li key={point} className="flex gap-3 text-[17px] leading-[1.45]">
                    <Icon icon={Tick02Icon} size={20} className="mt-0.5 shrink-0 text-accent-text" />
                    <span className="text-foreground/85">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Reveal className="self-end">
              <div className="glass rounded-[32px] p-7 sm:p-9">
                <span className="flex size-12 items-center justify-center rounded-full bg-brand text-white">
                  <Icon icon={LicenseIcon} size={23} />
                </span>
                <h3 className="mt-7 text-[clamp(1.5rem,2.4vw,1.95rem)] leading-[1.14] tracking-[-0.03em]">
                  Le logiciel ne peut jamais être vendu
                </h3>
                <p className="mt-4 text-[17px] leading-[1.5] text-muted">
                  La licence GPL v3 garantit que Dalibi reste libre : personne
                  ne peut le revendre comme un produit fermé ni en faire payer
                  la licence. Toute prestation facturée porte uniquement sur un{" "}
                  <span className="text-foreground">service d’accompagnement</span>,
                  jamais sur le logiciel lui-même.
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        <section id="demarrer" className="scroll-mt-28 pt-28 sm:pt-40">
          <Container>
            <div className="mx-auto max-w-[820px] text-center">
              <ScrollTitle
                text="Deux façons de démarrer"
                accent={["Deux", "façons"]}
                className="text-[clamp(2.4rem,5.4vw,4.5rem)] leading-[1.05]"
              />
              <Reveal>
                <p className="mt-6 text-[clamp(1.0625rem,1.4vw,1.2rem)] leading-[1.5] text-muted">
                  Déployez Dalibi par vos propres moyens, ou confiez-nous
                  l’installation et la configuration.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              <Reveal className="h-full">
                <article className="glass flex h-full flex-col rounded-[36px] p-7 sm:p-10">
                  <h3 className="text-[clamp(1.6rem,2.4vw,2rem)] tracking-[-0.03em]">{PLANS.self.title}</h3>
                  <p className="mt-1.5 text-[17px] text-muted">{PLANS.self.subtitle}</p>
                  <p className="mt-7 text-[clamp(2.75rem,4.6vw,3.75rem)] leading-none tracking-[-0.04em]">
                    {PLANS.self.price}
                  </p>
                  <ul className="mt-8 mb-9 flex flex-col gap-3.5">
                    {PLANS.self.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[17px] leading-[1.45]">
                        <Icon icon={Tick02Icon} size={20} className="mt-0.5 shrink-0 text-accent-text" />
                        <span className="text-foreground/85">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <PbButton
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    icon={Github01Icon}
                    className="mt-auto self-start"
                  >
                    Explorer le code
                  </PbButton>
                </article>
              </Reveal>

              <Reveal delay={0.08} className="h-full">
                <article className="relative flex h-full flex-col overflow-hidden rounded-[36px] bg-ink p-7 text-white ring-1 ring-white/8 sm:p-10">
                  <div
                    aria-hidden
                    className="absolute -right-[20%] -top-[30%] size-[460px] rounded-full"
                    style={{
                      background: "radial-gradient(closest-side, rgba(29,113,184,0.5), transparent)",
                    }}
                  />
                  <div className="relative flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-[clamp(1.6rem,2.4vw,2rem)] tracking-[-0.03em]">{PLANS.support.title}</h3>
                    <span className="rounded-[200px] bg-brand px-3 py-1 text-[14px]">Recommandé</span>
                  </div>
                  <p className="relative mt-1.5 text-[17px] text-white/70">{PLANS.support.subtitle}</p>
                  <p className="relative mt-7 text-[clamp(2.75rem,4.6vw,3.75rem)] leading-none tracking-[-0.04em]">
                    {PLANS.support.price}
                  </p>
                  <ul className="relative mt-8 mb-9 flex flex-col gap-3.5">
                    {PLANS.support.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[17px] leading-[1.45]">
                        <Icon icon={Tick02Icon} size={20} className="mt-0.5 shrink-0 text-[#8cc6f2]" />
                        <span className="text-white/85">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <PbButton href={CONTACT} icon={ArrowRight02Icon} className="mt-auto self-start">
                    Demander un devis
                  </PbButton>
                </article>
              </Reveal>
            </div>

            <Reveal className="mt-8">
              <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[17px] text-muted">
                <li className="flex items-center gap-2">
                  <Icon icon={Tick02Icon} size={19} className="text-accent-text" />
                  Aucun frais de licence
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon={ServerStack01Icon} size={19} className="text-accent-text" />
                  Installable par vos équipes techniques
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon={LicenseIcon} size={19} className="text-accent-text" />
                  Licence GPL v3
                </li>
              </ul>
            </Reveal>
          </Container>
        </section>

        <section id="comparatif" className="scroll-mt-28 pt-28 sm:pt-40">
          <Container>
            <div className="max-w-[820px]">
              <Eyebrow>Comparatif</Eyebrow>
              <ScrollTitle
                text="Le même logiciel, seul le service change"
                accent={["même", "logiciel,"]}
                className="text-[clamp(2.2rem,4.6vw,3.9rem)] leading-[1.06]"
              />
            </div>
            <Reveal className="mt-10">
              <div className="glass overflow-hidden rounded-[28px] sm:rounded-[36px]">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">
                    Comparaison entre l’auto-déploiement et l’accompagnement
                  </caption>
                  <thead>
                    <tr className="border-b">
                      <th scope="col" className="p-4 sm:px-8 sm:py-6">
                        <span className="sr-only">Critère</span>
                      </th>
                      <th scope="col" className="w-[30%] p-4 text-center text-[15px] sm:px-6 sm:py-6 sm:text-lg">
                        {PLANS.self.title}
                      </th>
                      <th scope="col" className="w-[30%] bg-brand/10 p-4 text-center text-[15px] sm:px-6 sm:py-6 sm:text-lg">
                        {PLANS.support.title}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row, i) => (
                      <tr key={row.label} className={i < COMPARISON.length - 1 ? "border-b" : undefined}>
                        <th scope="row" className="p-4 text-[15px] leading-[1.35] font-normal sm:px-8 sm:py-5 sm:text-[17px]">
                          {row.label}
                        </th>
                        <td className="p-3 text-center text-[14px] leading-[1.3] sm:px-6 sm:py-5 sm:text-base">
                          <Cell value={row.self} />
                        </td>
                        <td className="bg-brand/10 p-3 text-center text-[14px] leading-[1.3] sm:px-6 sm:py-5 sm:text-base">
                          <Cell value={row.support} tone="support" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </Container>
        </section>

        <section id="questions" className="scroll-mt-28 pt-28 sm:pt-40">
          <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>Questions fréquentes</Eyebrow>
              <ScrollTitle
                text="Ce que vous vous demandez sûrement"
                accent={["sûrement"]}
                className="text-[clamp(2.2rem,4.2vw,3.5rem)] leading-[1.07]"
              />
              <span className="mt-6 flex items-center gap-2 text-[17px] text-muted">
                <Icon icon={UserGroupIcon} size={20} className="text-accent-text" />
                <a href={`${SITE_URL}/faq`} className="text-accent-text underline underline-offset-4">
                  Voir toute la FAQ
                </a>
              </span>
            </div>
            <Reveal>
              <BrandFaq items={PRICING_FAQ} />
            </Reveal>
          </Container>
        </section>

        <CtaBlock
          title="Besoin d’être accompagné ?"
          accent={["accompagné"]}
          text="Parlez-nous de votre établissement : nous établissons un devis d’accompagnement adapté à vos besoins."
          primary={{ label: "Demander un devis", href: CONTACT }}
        />
      </main>
      <PageProgress sections={PRICING_SECTIONS} />
    </>
  );
}
