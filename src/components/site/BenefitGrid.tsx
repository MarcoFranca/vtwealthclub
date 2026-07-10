import { resolveIcon } from "@/lib/icons";
import type { Beneficio } from "@/sanity/types";
import { StaggerGroup, StaggerItem } from "./motion/Reveal";

export function BenefitGrid({ beneficios }: { beneficios: Beneficio[] }) {
  if (!beneficios?.length) return null;

  return (
    <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {beneficios.map((beneficio, index) => {
        const Icon = resolveIcon(beneficio.icone);
        return (
          <StaggerItem key={index}>
            <div className="h-full rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-lg">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand-navy">
                <Icon className="size-6" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold text-brand-navy">{beneficio.titulo}</h3>
              {beneficio.descricao && <p className="text-sm text-muted-foreground">{beneficio.descricao}</p>}
            </div>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
