import type { Metadata } from "next";

import { PageHero } from "@/components/site/PageHero";
import { InsuranceCard } from "@/components/site/InsuranceCard";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { getSeguros } from "@/sanity/lib/queries";
import { categoriaLabels, type Categoria } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Serviços | VT Wealth Club",
  description: "Conheça todas as soluções em seguros e planejamento financeiro da VT Wealth Club.",
};

const CATEGORIA_ORDEM: Categoria[] = ["pessoa", "bem", "financeiro"];

export default async function ServicosPage() {
  const seguros = await getSeguros();

  const grupos = CATEGORIA_ORDEM.map((categoria) => ({
    categoria,
    label: categoriaLabels[categoria],
    itens: seguros.filter((seguro) => seguro.categoria === categoria),
  })).filter((grupo) => grupo.itens.length > 0);

  return (
    <>
      <PageHero
        title="Serviços"
        subtitle="Desde 2014, a VT Wealth Club protege sonhos. Nosso compromisso é oferecer as melhores soluções em seguros para cada fase da sua vida."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        {grupos.map((grupo) => (
          <div key={grupo.categoria} className="mb-16 last:mb-0">
            <h2 className="mb-6 text-2xl font-bold text-brand-navy">{grupo.label}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {grupo.itens.map((seguro) => (
                <InsuranceCard key={seguro._id} seguro={seguro} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-blue">FAQs</p>
          <h2 className="max-w-2xl text-3xl font-bold text-brand-navy">
            Respostas especializadas para suas dúvidas de seguro
          </h2>
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </>
  );
}
