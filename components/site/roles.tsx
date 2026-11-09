"use client";

import { useState } from "react";
import {
  Building03Icon,
  Invoice01Icon,
  Mortarboard01Icon,
  Tick02Icon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons";
import { ROLES } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container, Eyebrow, Icon, Reveal, ScrollTitle } from "./primitives";

const ICONS = [Building03Icon, Mortarboard01Icon, Invoice01Icon, UserMultiple02Icon];

export function Roles() {
  const [active, setActive] = useState(0);

  return (
    <section id="pour-qui" className="scroll-mt-24 pt-28 sm:pt-44">
      <Container>
        <div className="max-w-[820px]">
          <Eyebrow>Pour chaque acteur de l’école</Eyebrow>
          <ScrollTitle
            text="Une réponse adaptée à chaque rôle"
            accent={["chaque", "rôle"]}
            className="text-[clamp(2.4rem,5.4vw,4.5rem)] leading-[1.05]"
          />
          <Reveal>
            <p className="mt-6 text-[clamp(1.0625rem,1.4vw,1.2rem)] leading-[1.5] text-muted">
              De la direction aux familles, chacun accède aux bons outils, avec
              les bonnes permissions.
            </p>
          </Reveal>
        </div>

        {/* Bureau : colonnes qui s’élargissent. Mobile : cartes empilées, toutes lisibles. */}
        <Reveal className="mt-12">
          <ul className="flex flex-col gap-3 xl:h-[440px] xl:flex-row">
            {ROLES.map((role, i) => {
              const open = i === active;
              return (
                <li
                  key={role.id}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "relative overflow-hidden rounded-[32px] border p-6 transition-[flex-grow,background-color,color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:p-7 xl:min-w-0 xl:basis-0",
                    open
                      ? "bg-ink text-white xl:grow-[3.4]"
                      : "glass text-foreground xl:grow",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-expanded={open}
                    className="absolute inset-0 z-10 hidden cursor-pointer rounded-[32px] xl:block"
                  >
                    <span className="sr-only">Afficher : {role.title}</span>
                  </button>

                  <div className="flex h-full flex-col">
                    <span
                      className={cn(
                        "flex size-13 shrink-0 items-center justify-center rounded-full transition-colors",
                        open ? "bg-brand text-white" : "bg-surface-sunken text-accent-text",
                      )}
                    >
                      <Icon icon={ICONS[i]} size={24} />
                    </span>

                    <h3
                      className={cn(
                        "mt-5 text-[1.5rem] leading-[1.15] tracking-[-0.025em] xl:mt-auto",
                        open ? "xl:text-[1.8rem]" : "xl:text-[1.2rem]",
                      )}
                    >
                      {role.title}
                    </h3>

                    <div
                      className={cn(
                        "transition-[opacity,visibility] duration-300 xl:w-[min(40vw,500px)]",
                        !open && "xl:invisible xl:absolute xl:opacity-0",
                      )}
                    >
                      <p
                        className={cn(
                          "mt-2 text-lg",
                          open ? "text-[#8cc6f2]" : "text-accent-text",
                        )}
                      >
                        {role.tagline}
                      </p>
                      <ul className="mt-5 flex flex-col gap-3">
                        {role.points.map((point) => (
                          <li key={point} className="flex gap-3 text-[17px] leading-[1.4]">
                            <Icon
                              icon={Tick02Icon}
                              size={20}
                              className={cn(
                                "mt-0.5 shrink-0",
                                open ? "text-[#8cc6f2]" : "text-accent-text",
                              )}
                            />
                            <span className={open ? "text-white/85" : "text-foreground/85"}>
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
