import type { Metadata } from "next";
import { Building2, ClipboardCheck, ShieldCheck, Users, WalletCards } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { InsuranceCard } from "@/components/site/InsuranceCard";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { DotGrid, RadialGlow } from "@/components/site/Decor";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/motion/Reveal";
import { getSeguros } from "@/sanity/lib/queries";
import { categoriaLabels, type Categoria } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Serviços | VT Wealth Club",
  description: "Conheça todas as soluções em seguros e planejamento financeiro da VT Wealth Club.",
};

const CATEGORIA_ORDEM: Categoria[] = ["pessoa", "bem", "financeiro"];

const caminhosDeProtecao = [
  {
    titulo: "Família e sucessão",
    descricao: "Proteja renda, herança e tranquilidade para quem depende de você.",
    icon: Users,
  },
  {
    titulo: "Empresa e sócios",
    descricao: "Reduza riscos operacionais, societários e impactos de imprevistos.",
    icon: Building2,
  },
  {
    titulo: "Patrimônio e bens",
    descricao: "Organize coberturas para veículos, imóveis, viagens e conquistas relevantes.",
    icon: ShieldCheck,
  },
  {
    titulo: "Planejamento financeiro",
    descricao: "Conecte seguros, saúde, previdência e decisões patrimoniais em uma estratégia.",
    icon: WalletCards,
  },
];

const criterios = [
  "Entendimento do momento de vida",
  "Comparação das melhores alternativas",
  "Acompanhamento na contratação e revisão",
];

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
        title="Soluções para proteger cada fase da sua vida"
        subtitle="Seguro certo começa com entendimento. A VT Wealth Club combina análise consultiva, experiência de mercado e soluções para família, empresa, patrimônio e planejamento financeiro."
      />

      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <RadialGlow className="-left-16 top-10 size-72 bg-brand-blue/10" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Por onde começar
            </p>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-2xl font-heading text-4xl font-semibold text-brand-navy">
                Escolha primeiro o que precisa proteger.
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Depois da conversa inicial, a recomendação deixa de ser uma lista de produtos e vira uma estratégia
                compatível com seu momento.
              </p>
            </div>
          </Reveal>

          <StaggerGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {caminhosDeProtecao.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.titulo}>
                  <div className="h-full rounded-xl border border-brand-navy/10 bg-white p-6 shadow-sm shadow-brand-navy/5 transition-transform hover:-translate-y-1">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand-navy">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="font-semibold text-brand-navy">{item.titulo}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.descricao}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-soft/40 py-14">
        <DotGrid id="dots-servicos-processo" className="text-brand-navy/[0.04]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {criterios.map((criterio) => (
              <div key={criterio} className="flex items-center gap-3 rounded-xl bg-white/80 p-5 ring-1 ring-brand-navy/10">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue text-white">
                  <ClipboardCheck className="size-5" />
                </div>
                <p className="text-sm font-medium text-brand-navy">{criterio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-soft/20 to-white py-16 md:py-20">
        <DotGrid id="dots-servicos-lista" className="text-brand-navy/[0.045]" />
        <div className="relative mx-auto max-w-7xl px-6">
          {grupos.map((grupo) => (
            <div key={grupo.categoria} className="mb-16 last:mb-0">
              <Reveal>
                <div className="mb-7 flex flex-col gap-2 border-b border-brand-navy/10 pb-5 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
                      Categoria
                    </p>
                    <h2 className="font-heading text-3xl font-semibold text-brand-navy">{grupo.label}</h2>
                  </div>
                  <p className="max-w-md text-sm text-muted-foreground">
                    Soluções analisadas conforme perfil, prioridade e momento de vida.
                  </p>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {grupo.itens.map((seguro) => (
                  <InsuranceCard key={seguro._id} seguro={seguro} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-muted/40 py-16">
        <RadialGlow className="right-[-4rem] top-0 size-72 bg-brand-soft/80" />
        <div className="relative mx-auto max-w-7xl px-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">FAQs</p>
          <h2 className="max-w-2xl font-heading text-3xl font-semibold text-brand-navy">
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
