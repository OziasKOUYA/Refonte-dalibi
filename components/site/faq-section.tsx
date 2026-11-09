"use client";

import Link from "next/link";
import { Faq, type FaqItem } from "@/components/ui/faq";
import { FAQ_ITEMS, SITE_URL } from "@/lib/content";
import { Container, Eyebrow, Reveal, ScrollTitle } from "./primitives";

/** La FAQ Rare UI aux couleurs de Dalibi. */
export function BrandFaq({ items }: { items: FaqItem[] }) {
  return (
    <Faq
      items={items}
      defaultValue={items[0]?.id}
      accent="#1D71B8"
      avatar={
        <span className="flex size-full items-center justify-center p-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="" className="h-auto w-full" />
        </span>
      }
      className="max-w-none"
    />
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-28 pt-28 sm:pt-44">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Questions fréquentes</Eyebrow>
          <ScrollTitle
            text="Tout ce qu’il faut savoir sur Dalibi"
            accent={["Dalibi"]}
            className="text-[clamp(2.4rem,4.6vw,3.9rem)] leading-[1.06]"
          />
          <Reveal>
            <p className="mt-6 max-w-[440px] text-[clamp(1.0625rem,1.4vw,1.2rem)] leading-[1.5] text-muted">
              Une autre question ?{" "}
              <Link href="/contact" className="text-accent-text underline underline-offset-4">
                Contactez-nous
              </Link>{" "}
              ou consultez{" "}
              <a
                href={`${SITE_URL}/faq`}
                className="text-accent-text underline underline-offset-4"
              >
                la FAQ complète
              </a>
              .
            </p>
          </Reveal>
        </div>

        <Reveal>
          <BrandFaq items={FAQ_ITEMS} />
        </Reveal>
      </Container>
    </section>
  );
}
