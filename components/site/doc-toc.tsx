"use client";

import { RailToc, type RailTocItem } from "@/components/ui/rail-toc";

/** Sommaire : avion Rare UI sur grand écran, liste repliable sur téléphone et tablette. */
export function DocToc({ items }: { items: RailTocItem[] }) {
  return (
    <>
      <details className="glass group rounded-[24px] p-1 lg:hidden">
        <summary className="cursor-pointer list-none rounded-[200px] px-4 py-3 text-[17px] [&::-webkit-details-marker]:hidden">
          Sur cette page
          <span className="float-right text-accent-text group-open:hidden">Afficher</span>
          <span className="float-right hidden text-accent-text group-open:inline">Masquer</span>
        </summary>
        <ul className="grid gap-x-3 px-2 pb-2 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="block rounded-[200px] px-2.5 py-2 text-[16px] text-foreground/85">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </details>

      <div className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto pb-6 [scrollbar-width:none] lg:block">
        <RailToc items={items} offset={112} className="w-full text-[15px]" />
      </div>
    </>
  );
}
