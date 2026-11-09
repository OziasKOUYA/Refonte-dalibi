"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight02Icon,
  Cancel01Icon,
  Github01Icon,
  Menu02Icon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { GITHUB_URL, NAV_LINKS } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Icon, PbButton } from "./primitives";

function ThemeToggle() {
  const toggle = () => {
    const apply = () => {
      const next = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("dalibi-theme", next ? "dark" : "light");
      } catch {
        // stockage indisponible : le thème reste valable pour cette visite
      }
    };
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !calm) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Basculer entre le mode clair et le mode sombre"
      className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-[200px] border border-border bg-surface-sunken text-foreground transition-colors hover:text-accent-text"
    >
      {/* Les deux icônes sont dans le DOM : le CSS choisit, donc pas de décalage à l’hydratation */}
      <span className="dark:hidden">
        <Icon icon={Moon02Icon} size={20} />
      </span>
      <span className="hidden dark:block">
        <Icon icon={Sun03Icon} size={20} />
      </span>
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:top-4 sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        <nav
          aria-label="Navigation principale"
          data-scrolled={scrolled}
          className="glass-nav flex items-center justify-between gap-3 rounded-[200px] py-2 pl-5 pr-2 sm:pl-7"
        >
          <Link href="/" aria-label="Dalibi, page d’accueil" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/dalibi.svg" alt="" width={110} height={24} className="h-6 w-auto dark:hidden" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/dalibi-blanc.svg" alt="" width={110} height={24} className="hidden h-6 w-auto dark:block" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={cn(
                    "rounded-[200px] px-4 py-2 text-[16px] transition-colors hover:bg-surface-sunken hover:text-foreground",
                    pathname === link.href
                      ? "bg-surface-sunken text-accent-text"
                      : "text-foreground/80",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Dalibi sur GitHub"
              className="hidden size-11 shrink-0 items-center justify-center rounded-[200px] border border-border bg-surface-sunken text-foreground transition-colors hover:text-accent-text xl:flex"
            >
              <Icon icon={Github01Icon} size={20} />
            </a>
            <ThemeToggle />
            <PbButton
              href="/contact?sujet=devis"
              size="nav"
              icon={ArrowRight02Icon}
              className="max-sm:hidden"
            >
              Demander un devis
            </PbButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="flex size-11 cursor-pointer items-center justify-center rounded-[200px] border border-border bg-surface-sunken text-foreground lg:hidden"
            >
              <Icon icon={open ? Cancel01Icon : Menu02Icon} size={20} />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="menu-mobile"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="glass-nav mt-2 origin-top rounded-[32px] p-3 lg:hidden"
              data-scrolled="true"
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className={cn(
                        "block rounded-[200px] px-4 py-3 text-lg",
                        pathname === link.href ? "bg-surface-sunken text-accent-text" : "text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <PbButton
                href="/contact?sujet=devis"
                size="nav"
                icon={ArrowRight02Icon}
                className="mt-2 w-full sm:hidden"
              >
                Demander un devis
              </PbButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
