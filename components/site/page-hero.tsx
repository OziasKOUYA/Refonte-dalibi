"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "./primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

/** En-tête des pages secondaires : même décor que le hero de l’accueil, sans coupure avec le fond. */
export function PageHero({
  eyebrow,
  lines,
  description,
  children,
  aside,
}: {
  eyebrow: ReactNode;
  /** Une entrée par ligne de titre ; `accent` passe la fin de ligne en bleu. */
  lines: { text: string; accent?: string }[];
  description: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section className="relative pt-32 sm:pt-44">
      <div className="hero-grid" aria-hidden />
      <div
        aria-hidden
        className="hero-aurora left-[6%] top-[-6%] size-[min(58vw,620px)]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--brand) 42%, transparent), transparent)",
        }}
      />
      <div
        aria-hidden
        className="hero-aurora right-[-6%] top-[8%] size-[min(50vw,520px)]"
        style={{
          animationDelay: "-7s",
          background: "radial-gradient(closest-side, var(--wash-teal), transparent)",
        }}
      />

      <Container
        className={
          aside
            ? "relative grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]"
            : "relative"
        }
      >
        <div>
          <motion.div
            {...enter(0)}
            className="glass mb-7 inline-flex items-center gap-2 rounded-[200px] py-2 pl-3 pr-4 text-[15px] text-foreground"
          >
            {eyebrow}
          </motion.div>

          <h1 className="text-[clamp(2.7rem,7vw,5.6rem)] leading-[1.02] font-medium tracking-[-0.03em]">
            {lines.map((line, i) => (
              <span key={line.text + i} className="block overflow-hidden pb-[0.12em]">
                <motion.span
                  className="block"
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.12, ease: EASE }}
                >
                  {line.text}
                  {line.accent && (
                    <>
                      {line.text && " "}
                      <span className="text-accent-text">{line.accent}</span>
                    </>
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            {...enter(0.35)}
            className="mt-7 max-w-[680px] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.45] text-muted"
          >
            {description}
          </motion.p>

          {children && (
            <motion.div {...enter(0.45)} className="mt-9">
              {children}
            </motion.div>
          )}
        </div>

        {aside && <motion.div {...enter(0.5)}>{aside}</motion.div>}
      </Container>
    </section>
  );
}
