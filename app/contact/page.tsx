import type { Metadata } from "next";
import {
  ArrowRight01Icon,
  Github01Icon,
  Location01Icon,
  Mail01Icon,
  PresentationBarChart01Icon,
  Comment01Icon,
} from "@hugeicons/core-free-icons";
import { ContactForm } from "@/components/site/contact-form";
import { BrandFaq } from "@/components/site/faq-section";
import { PageHero } from "@/components/site/page-hero";
import { Container, Eyebrow, Icon, Reveal, ScrollTitle } from "@/components/site/primitives";
import { FAQ_ITEMS, GITHUB_URL, SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Demandez une démonstration ou posez-nous vos questions : notre équipe vous répond rapidement et vous accompagne dans la digitalisation de votre école.",
};

const REASONS = [
  {
    icon: PresentationBarChart01Icon,
    title: "Demande de démo",
    text: "Une présentation adaptée à votre établissement.",
  },
  {
    icon: Comment01Icon,
    title: "Support & questions",
    text: "Une réponse rapide à toutes vos questions.",
  },
  {
    icon: Location01Icon,
    title: "Disponibilité",
    text: "Togo & Afrique de l’Ouest.",
  },
];

const CONTACT_FAQ = FAQ_ITEMS.filter((item) => ["prix", "hors-ligne", "multi"].includes(item.id));

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow={
          <>
            <Icon icon={Mail01Icon} size={18} className="text-accent-text" />
            Contact
          </>
        }
        lines={[{ text: "Parlons de" }, { text: "", accent: "votre établissement" }]}
        description="Demandez une démonstration ou posez-nous vos questions : notre équipe vous répond rapidement et vous accompagne dans la digitalisation de votre école."
      />

      <section className="pt-14 sm:pt-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
          <div className="lg:sticky lg:top-32">
            <h2 className="text-[clamp(1.9rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.03em]">Écrivez-nous</h2>
            <p className="mt-3 text-[17.5px] leading-[1.5] text-muted">
              Remplissez le formulaire, nous revenons vers vous dans les meilleurs délais.
            </p>

            <ul className="mt-7">
              {REASONS.map((reason) => (
                <li key={reason.title} className="flex gap-4 border-t py-4.5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/12 text-accent-text">
                    <Icon icon={reason.icon} size={21} />
                  </span>
                  <div>
                    <h3 className="text-[1.15rem] leading-[1.25] tracking-[-0.02em]">{reason.title}</h3>
                    <p className="mt-1 text-base leading-[1.45] text-muted">{reason.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-start gap-3 border-t pt-5">
              <a
                href="mailto:contact@dalibi.app"
                className="group inline-flex items-center gap-2 text-[17px] underline-offset-4 hover:underline"
              >
                <Icon icon={Mail01Icon} size={20} className="text-accent-text" />
                contact@dalibi.app
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-[17px] underline-offset-4 hover:underline"
              >
                <Icon icon={Github01Icon} size={20} className="text-accent-text" />
                Le projet est open source sur GitHub
              </a>
            </div>
          </div>

          <ContactForm />
        </Container>
      </section>

      <section className="pt-28 pb-24 sm:pt-40 sm:pb-36">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <Eyebrow>Avant de nous écrire</Eyebrow>
            <ScrollTitle
              text="Vous avez peut-être déjà la réponse"
              accent={["déjà", "la", "réponse"]}
              className="text-[clamp(2.2rem,4.2vw,3.5rem)] leading-[1.07]"
            />
            <a
              href={`${SITE_URL}/faq`}
              className="group mt-6 inline-flex items-center gap-1.5 text-lg underline-offset-4 hover:underline"
            >
              Voir toute la FAQ
              <Icon
                icon={ArrowRight01Icon}
                size={20}
                className="text-accent-text transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
          <Reveal>
            <BrandFaq items={CONTACT_FAQ} />
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
