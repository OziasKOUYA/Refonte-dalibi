"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight01Icon,
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
  Location01Icon,
  Wallet03Icon,
} from "@hugeicons/core-free-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { DEMO_MAILTO } from "@/lib/content";
import { Container, Icon, PbButton } from "./primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

const TITLE_LINES = [
  { text: "Pilotez toute votre école", accent: false },
  { text: "depuis un", accent: false, trail: "seul tableau de bord" },
];

const STATS = [
  { value: 7, label: "modules intégrés" },
  { value: 5, label: "rôles préconfigurés" },
  { value: 3, label: "examens officiels : CEPD, BEPC, BAC" },
  { value: 100, suffix: " %", label: "de code ouvert et auditable" },
];

function Stat({ value, suffix, label }: (typeof STATS)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (inView) setShown(value);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex items-baseline gap-3 lg:block">
      <AnimatedCounter
        value={shown}
        duration={1}
        suffix={suffix}
        className="text-[2.75rem] leading-none font-normal tracking-[-0.03em] text-foreground sm:text-[3.5rem]"
      />
      <p className="text-base text-muted lg:mt-2">{label}</p>
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ["start 0.95", "start 0.2"],
  });
  // La maquette se redresse en arrivant au centre de l’écran
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0.94, 1]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 70, 0]);
  const chipY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 44, 0]);

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section id="accueil" className="relative scroll-mt-32 pt-32 sm:pt-40">
      <div className="hero-grid" aria-hidden />
      <div
        aria-hidden
        className="hero-aurora left-[8%] top-[-4%] size-[min(58vw,620px)]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--brand) 42%, transparent), transparent)",
        }}
      />
      <div
        aria-hidden
        className="hero-aurora right-[-6%] top-[14%] size-[min(50vw,520px)]"
        style={{
          animationDelay: "-7s",
          background:
            "radial-gradient(closest-side, var(--wash-teal), transparent)",
        }}
      />

      <Container className="relative">
        <motion.p
          {...enter(0)}
          className="glass mb-7 inline-flex items-center gap-2 rounded-[200px] py-2 pl-3 pr-4 text-[15px] text-foreground"
        >
          <Icon icon={Location01Icon} size={18} className="text-accent-text" />
          Conçu pour les écoles d’Afrique de l’Ouest
        </motion.p>

        <h1 className="text-[clamp(2.7rem,7vw,5.6rem)] leading-[1.02] font-medium tracking-[-0.038em]">
          {TITLE_LINES.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-[0.12em]">
              <motion.span
                className="block"
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.1 + i * 0.12, ease: EASE }}
              >
                {line.text}
                {line.trail && (
                  <>
                    {" "}
                    <span className="text-accent-text">{line.trail}</span>
                  </>
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-7 grid items-end gap-8 xl:grid-cols-[minmax(0,1fr)_auto] xl:gap-16">
          <motion.p
            {...enter(0.35)}
            className="max-w-[620px] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.45] text-muted"
          >
            Inscriptions, notes, bulletins, trésorerie, paie, présences et
            portail parents : Dalibi réunit toute la vie scolaire dans une
            plateforme claire, rapide et sécurisée.
          </motion.p>
          <motion.div
            {...enter(0.45)}
            className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7"
          >
            <PbButton href={DEMO_MAILTO} icon={ArrowRight02Icon}>
              Demander une démo gratuite
            </PbButton>
            <a
              href="#modules"
              className="group inline-flex items-center gap-1.5 whitespace-nowrap text-lg text-foreground underline-offset-4 hover:underline max-sm:mx-auto"
            >
              Voir les fonctionnalités
              <Icon
                icon={ArrowRight01Icon}
                size={20}
                className="text-accent-text transition-transform group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>

        {/* Présentation de l’application */}
        <div
          ref={stage}
          className="relative mt-12 [perspective:1600px] sm:mt-14"
        >
          <motion.div
            style={{ rotateX, scale }}
            className="glass origin-bottom rounded-[20px] p-1.5 sm:rounded-[34px] sm:p-3"
          >
            <div className="overflow-hidden rounded-[14px] border sm:rounded-[24px]">
              <Image
                src="/dalibi-showcase.png"
                alt="Tableau de bord Dalibi : total facturé, encaissé, reste à recouvrer, élèves inscrits, présences et examens officiels"
                width={1700}
                height={947}
                priority
                sizes="(max-width: 1280px) 96vw, 1200px"
                className="h-auto w-full"
              />
            </div>
          </motion.div>

          {/* Vue mobile en surimpression */}
          <motion.div
            style={{ y: phoneY }}
            className="absolute -bottom-6 right-[3%] w-[26%] max-w-[230px] rounded-[20px] bg-ink p-1 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.6)] sm:-bottom-10 sm:rounded-[36px] sm:p-2"
          >
            <Image
              src="/dalibi-showcase-mobile.png"
              alt="Dalibi sur téléphone"
              width={514}
              height={945}
              sizes="230px"
              className="h-auto w-full rounded-[16px] sm:rounded-[28px]"
            />
          </motion.div>

          {/* Repères tirés de la démonstration ci-dessus */}
          <motion.div
            style={{ y: chipY }}
            className="glass absolute -left-2 top-[18%] hidden items-center gap-3 rounded-[22px] py-3 pl-3 pr-5 md:flex lg:-left-8"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-brand text-white">
              <Icon icon={Wallet03Icon} size={20} />
            </span>
            <span>
              <span className="block text-sm text-muted">Encaissé</span>
              <span className="block text-lg font-medium tracking-[-0.02em]">
                160 000 FCFA
              </span>
            </span>
          </motion.div>
          <motion.div
            style={{ y: chipY }}
            className="glass absolute bottom-[22%] left-[6%] hidden items-center gap-3 rounded-[22px] py-3 pl-3 pr-5 md:flex"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-ink text-white dark:bg-white/10">
              <Icon icon={CheckmarkCircle02Icon} size={20} />
            </span>
            <span>
              <span className="block text-sm text-muted">
                Taux de recouvrement
              </span>
              <span className="block text-lg font-medium tracking-[-0.02em]">
                97 %
              </span>
            </span>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:mt-28 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {STATS.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
