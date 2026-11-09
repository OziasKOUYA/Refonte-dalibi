"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Archive01Icon,
  ArrowRight02Icon,
  Briefcase01Icon,
  Calendar03Icon,
  Invoice03Icon,
  Mortarboard02Icon,
  SecurityCheckIcon,
  Tick02Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { MODULES, type ModuleId } from "@/lib/content";
import { PREVIEWS } from "./mock-ui";
import { cn } from "@/lib/utils";
import { Container, Eyebrow, Icon, PbButton, Reveal, ScrollTitle } from "./primitives";

const MODULE_ICONS: Record<ModuleId, IconSvgElement> = {
  eleves: UserGroupIcon,
  bulletins: Mortarboard02Icon,
  tresorerie: Invoice03Icon,
  presences: Calendar03Icon,
  paie: Briefcase01Icon,
  documents: Archive01Icon,
  "securite-module": SecurityCheckIcon,
};

/* ---------- Section ---------- */

export function Modules() {
  const [activeId, setActiveId] = useState<ModuleId>(MODULES[0].id);
  const reduced = useReducedMotion();
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = MODULES.find((m) => m.id === activeId) ?? MODULES[0];
  const activeIndex = MODULES.indexOf(active);

  // Navigation clavier du motif "onglets" : flèches, Début, Fin
  const onKeyDown = (event: KeyboardEvent) => {
    const last = MODULES.length - 1;
    const next: Record<string, number> = {
      ArrowDown: activeIndex === last ? 0 : activeIndex + 1,
      ArrowRight: activeIndex === last ? 0 : activeIndex + 1,
      ArrowUp: activeIndex === 0 ? last : activeIndex - 1,
      ArrowLeft: activeIndex === 0 ? last : activeIndex - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    setActiveId(MODULES[next[event.key]].id);
    tabs.current[next[event.key]]?.focus();
  };

  return (
    <section id="modules" className="scroll-mt-24 pt-28 sm:pt-44">
      <Container>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-end">
          <div>
            <Eyebrow>Fonctionnalités</Eyebrow>
            <ScrollTitle
              text="Sept modules intégrés, une seule application"
              accent={["Sept", "modules"]}
              className="text-[clamp(2.4rem,5.4vw,4.5rem)] leading-[1.05]"
            />
          </div>
          <Reveal>
            <p className="text-[clamp(1.0625rem,1.4vw,1.2rem)] leading-[1.5] text-muted">
              Couvrir tous les besoins administratifs, pédagogiques et
              financiers, sans logiciel tiers. Choisissez un module pour
              découvrir son écran.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <div className="glass rounded-[32px] p-2.5 sm:rounded-[40px] sm:p-3.5">
            <div className="grid gap-3 lg:grid-cols-[310px_minmax(0,1fr)]">
              {/* Liste des modules */}
              <div
                role="tablist"
                aria-label="Modules de Dalibi"
                aria-orientation="vertical"
                onKeyDown={onKeyDown}
                className="-mx-1 flex snap-x gap-1.5 overflow-x-auto px-1 py-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible"
              >
                {MODULES.map((module, i) => {
                  const selected = module.id === activeId;
                  return (
                    <button
                      key={module.id}
                      ref={(el) => {
                        tabs.current[i] = el;
                      }}
                      id={`${uid}-tab-${module.id}`}
                      role="tab"
                      type="button"
                      aria-selected={selected}
                      aria-controls={`${uid}-panel`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveId(module.id)}
                      className={cn(
                        "relative flex shrink-0 cursor-pointer snap-start items-center gap-3 rounded-[200px] py-2 pl-2 pr-5 text-left text-[16.5px] tracking-[-0.01em] transition-colors lg:w-full",
                        selected ? "text-white" : "text-foreground/80 hover:bg-surface-sunken hover:text-foreground",
                      )}
                    >
                      {selected && (
                        <motion.span
                          layoutId={reduced ? undefined : `${uid}-indicator`}
                          transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                          className="absolute inset-0 rounded-[200px] bg-brand"
                        />
                      )}
                      <span
                        className={cn(
                          "relative flex size-10 shrink-0 items-center justify-center rounded-full",
                          selected ? "bg-white/18" : "bg-surface-sunken text-accent-text",
                        )}
                      >
                        <Icon icon={MODULE_ICONS[module.id]} size={20} />
                      </span>
                      <span className="relative whitespace-nowrap">{module.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Écran du module sélectionné */}
              <div
                id={`${uid}-panel`}
                role="tabpanel"
                aria-labelledby={`${uid}-tab-${active.id}`}
                className="rounded-[24px] bg-surface-sunken p-5 sm:rounded-[30px] sm:p-8"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.id}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                    className="grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-9"
                  >
                    <div>
                      <p className="text-[15px] text-accent-text">
                        {active.category}
                      </p>
                      <h3 className="mt-2 text-[clamp(1.75rem,2.8vw,2.4rem)] leading-[1.1] tracking-[-0.03em]">
                        {active.title}
                      </h3>
                      <ul className="mt-7 flex flex-col gap-4">
                        {active.points.map((point) => (
                          <li key={point} className="flex gap-3 text-[17px] leading-[1.45]">
                            <Icon icon={Tick02Icon} size={20} className="mt-0.5 shrink-0 text-accent-text" />
                            <span className="text-foreground/85">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="min-h-[340px]">{PREVIEWS[active.id]}</div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-[14px] text-muted">
            Aperçus illustratifs, données fictives.
          </p>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <PbButton href="/fonctionnalites" icon={ArrowRight02Icon}>
            Voir toutes les fonctionnalités
          </PbButton>
        </Reveal>
      </Container>
    </section>
  );
}
