import { Hero } from "@/components/site/hero";
import { Digital } from "@/components/site/digital";
import { Modules } from "@/components/site/modules";
import { Automation } from "@/components/site/automation";
import { Roles } from "@/components/site/roles";
import { Pilotage } from "@/components/site/pilotage";
import { Security } from "@/components/site/security";
import { OpenSource } from "@/components/site/open-source";
import { FaqSection } from "@/components/site/faq-section";
import { FinalCta } from "@/components/site/final-cta";
import { PageProgress } from "@/components/site/page-progress";
import { PAGE_SECTIONS } from "@/lib/content";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Digital />
        <Modules />
        <Automation />
        <Roles />
        <Pilotage />
        <Security />
        <OpenSource />
        <FaqSection />
        <FinalCta />
      </main>
      <PageProgress sections={PAGE_SECTIONS} />
    </>
  );
}
