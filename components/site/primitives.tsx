"use client";

import { useRef, type ComponentProps, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export function Icon({
  icon,
  size = 22,
  className,
}: {
  icon: IconSvgElement;
  size?: number;
  className?: string;
}) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={1.6}
      className={className}
      aria-hidden
    />
  );
}

/** Le bouton de la charte. `icon` s’affiche après le libellé. */
export function PbButton({
  children,
  href,
  icon,
  size,
  className,
  ...props
}: Omit<ComponentProps<"a">, "href"> & {
  href: string;
  icon?: IconSvgElement;
  size?: "nav";
}) {
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <span>
          <Icon icon={icon} size={size === "nav" ? 18 : 22} />
        </span>
      )}
    </>
  );
  const classes = cn("pb-ai-button", className);

  // Les pages du site passent par le routeur, le reste (mailto, GitHub) reste un lien classique
  if (href.startsWith("/")) {
    return (
      <Link href={href} data-size={size} className={classes} {...props}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} data-size={size} className={classes} {...props}>
      {inner}
    </a>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-2.5 text-[15px] tracking-[-0.005em] text-accent-text">
      <span className="h-px w-7 bg-current" aria-hidden />
      {children}
    </p>
  );
}

function Word({
  word,
  index,
  total,
  progress,
  accent,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  accent: boolean;
}) {
  const start = index / total;
  const end = Math.min(1, start + 2.5 / total);
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  const y = useTransform(progress, [start, end], ["0.28em", "0em"]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={cn("inline-block will-change-transform", accent && "text-accent-text")}
    >
      {word}
    </motion.span>
  );
}

/**
 * Titre lié au défilement : chaque mot sort de la pénombre et remonte
 * à mesure que le titre traverse l’écran.
 */
export function ScrollTitle({
  text,
  accent = [],
  as: Tag = "h2",
  className,
}: {
  text: string;
  /** Mots à passer en bleu, tels qu’écrits dans `text`. */
  accent?: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.48"],
  });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={cn("section-title", className)}>
      {reduced
        ? text
        : words.map((word, i) => (
            <span key={`${word}-${i}`}>
              <Word
                word={word}
                index={i}
                total={words.length}
                progress={scrollYProgress}
                accent={accent.includes(word)}
              />
              {i < words.length - 1 ? " " : null}
            </span>
          ))}
    </Tag>
  );
}

/** Apparition discrète d’un bloc à son entrée dans l’écran. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Container({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8", className)}
      {...props}
    />
  );
}
