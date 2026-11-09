"use client";

import { ScrollProgress, type ScrollProgressSection } from "@/components/ui/scroll-progress";

export function PageProgress({ sections }: { sections: ScrollProgressSection[] }) {
  return <ScrollProgress sections={sections} className="max-md:hidden" />;
}
