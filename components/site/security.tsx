import {
  DatabaseSyncIcon,
  LockPasswordIcon,
  ServerStack01Icon,
  ShieldUserIcon,
  TwoFactorAccessIcon,
  UserLock01Icon,
} from "@hugeicons/core-free-icons";
import { SECURITY_ITEMS } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container, Eyebrow, Icon, Reveal, ScrollTitle } from "./primitives";

const ICONS = [
  ShieldUserIcon,
  UserLock01Icon,
  TwoFactorAccessIcon,
  LockPasswordIcon,
  DatabaseSyncIcon,
  ServerStack01Icon,
];

export function Security() {
  return (
    <section id="securite" className="scroll-mt-24 pt-28 sm:pt-44">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Sécurité & accès</Eyebrow>
            <ScrollTitle
              text="Gouverné par les permissions"
              accent={["permissions"]}
              className="text-[clamp(2.4rem,5.4vw,4.5rem)] leading-[1.05]"
            />
          </div>
          <Reveal>
            <p className="text-[clamp(1.0625rem,1.4vw,1.2rem)] leading-[1.5] text-muted">
              Données scolaires sensibles, élèves mineurs : Dalibi applique une
              défense en profondeur, du menu jusqu’à la base de données.
              Chaque action est gouvernée par une permission, et les fichiers
              sensibles restent privés.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          {/* Un seul panneau avec des filets : le quadrillage rappelle une matrice de droits */}
          <ul className="glass grid overflow-hidden rounded-[32px] sm:rounded-[40px] md:grid-cols-2 lg:grid-cols-3">
            {SECURITY_ITEMS.map((item, i) => (
              <li
                key={item.title}
                className={cn(
                  "border-b p-7 sm:p-9",
                  i === 5 && "border-b-0",
                  i % 2 === 0 && "md:border-r",
                  i >= 4 && "md:border-b-0",
                  i % 3 === 2 ? "lg:border-r-0" : "lg:border-r",
                  i >= 3 && "lg:border-b-0",
                )}
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-brand/12 text-accent-text">
                  <Icon icon={ICONS[i]} size={23} />
                </span>
                <h3 className="mt-7 text-[1.4rem] leading-[1.2] tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-2.5 text-[16.5px] leading-[1.5] text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
