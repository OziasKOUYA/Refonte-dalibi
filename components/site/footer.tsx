import Link from "next/link";
import { Github01Icon, Location01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { FOOTER_COLUMNS, GITHUB_URL } from "@/lib/content";
import { Icon } from "./primitives";

const LINK =
  "text-[17px] text-white/90 underline-offset-4 transition-colors hover:text-[#8cc6f2] hover:underline";

export function SiteFooter() {
  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative mx-auto max-w-[1560px] overflow-hidden rounded-[32px] bg-ink text-white ring-1 ring-white/8 sm:rounded-[48px]">
        <div
          aria-hidden
          className="absolute -right-[10%] -top-[40%] size-[640px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(29,113,184,0.55), transparent)",
          }}
        />

        <div className="relative grid gap-12 px-7 pt-12 pb-10 sm:px-12 sm:pt-16 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/dalibi-blanc.svg" alt="Dalibi" width={138} height={30} className="h-7.5 w-auto" />
            <p className="mt-6 max-w-[390px] text-[1.25rem] leading-[1.35] tracking-[-0.015em] text-white/85">
              Le logiciel de gestion scolaire tout-en-un pour l’Afrique.
            </p>
            <p className="mt-6 flex items-center gap-2 text-base text-white/65">
              <Icon icon={Location01Icon} size={18} />
              Togo & Afrique de l’Ouest
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href="mailto:contact@dalibi.app"
                aria-label="Écrire à Dalibi"
                className="flex size-11 items-center justify-center rounded-[200px] bg-white/10 transition-colors hover:bg-brand"
              >
                <Icon icon={Mail01Icon} size={20} />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Dalibi sur GitHub"
                className="flex size-11 items-center justify-center rounded-[200px] bg-white/10 transition-colors hover:bg-brand"
              >
                <Icon icon={Github01Icon} size={20} />
              </a>
            </div>
          </div>

          <nav aria-label="Liens du pied de page" className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className="text-base text-white/55">{column.title}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link href={link.href} className={LINK}>
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className={LINK}>
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="relative mx-7 flex flex-col justify-between gap-2 border-t border-white/12 py-6 text-[15px] text-white/60 sm:mx-12 sm:flex-row">
          <p>© 2026 Dalibi. Open source sous licence GPL v3.</p>
          <a
            href={`${GITHUB_URL}/releases/tag/v1.0.0`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            v1.0.0
          </a>
        </div>

        {/* Signature : le logo en grand, coupé par le bas du panneau */}
        <div aria-hidden className="relative -mb-[5%] px-7 opacity-[0.07] sm:px-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/dalibi-blanc.svg" alt="" className="h-auto w-full" />
        </div>
      </div>
    </footer>
  );
}
