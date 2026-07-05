import { Phone } from "lucide-react";

import type { ConfiguracoesGerais, Seguro } from "@/sanity/types";
import { QuoteForm } from "./QuoteForm";

export function QuoteBlock({
  seguros,
  config,
  defaultServico,
}: {
  seguros: Seguro[];
  config: ConfiguracoesGerais;
  defaultServico?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="relative flex flex-col justify-center gap-4 bg-gradient-to-br from-brand-navy-light to-brand-navy p-8 text-white">
          <span className="w-fit rounded-full bg-brand-blue/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">
            10 anos de mercado
          </span>
          <h3 className="font-heading text-2xl font-semibold leading-tight">Excelência por 10 anos consecutivos.</h3>
          <p className="text-sm text-white/80">
            Desde 2014, nossa companhia de seguros tem protegido sonhos. Enfrentamos tempestades, reconstruímos
            vidas e protegemos legados.
          </p>
          {config.telefone && (
            <a
              href={`tel:${config.telefone.replace(/\D/g, "")}`}
              className="mt-2 inline-flex items-center gap-2 self-start rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium transition-colors hover:bg-brand-blue-dark"
            >
              <Phone className="size-4" />
              {config.telefone}
            </a>
          )}
        </div>
        <div className="bg-white p-8">
          <h3 className="mb-4 font-heading text-xl font-semibold text-brand-navy">Pedir uma cotação!</h3>
          <QuoteForm seguros={seguros} defaultServico={defaultServico} />
        </div>
      </div>
    </section>
  );
}
