import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, MessageCircle, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductHero } from "@/components/site/ProductHero";
import { BenefitGrid } from "@/components/site/BenefitGrid";
import { QuoteBlock } from "@/components/site/QuoteBlock";
import { InsuranceCard } from "@/components/site/InsuranceCard";
import { DotGrid, RadialGlow } from "@/components/site/Decor";
import { Reveal } from "@/components/site/motion/Reveal";
import { getConfiguracoesGerais, getSeguroBySlug, getSeguros } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const seguros = await getSeguros();
  return seguros.map((seguro) => ({ slug: seguro.slug }));
}

const etapasAnalise = [
  {
    titulo: "Entender seu perfil",
    descricao: "Antes da proposta, avaliamos renda, patrimônio, dependentes, empresa e prioridades.",
    icon: MessageCircle,
  },
  {
    titulo: "Ajustar cobertura e custo",
    descricao: "A recomendação considera proteção real, orçamento, carências, limites e finalidade do seguro.",
    icon: ClipboardCheck,
  },
  {
    titulo: "Acompanhar a decisão",
    descricao: "Depois da contratação, a proteção pode ser revisada conforme sua vida ou negócio evolui.",
    icon: ShieldCheck,
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seguro = await getSeguroBySlug(slug);
  if (!seguro) return {};

  return {
    title: seguro.seo?.title || `${seguro.title} | VT Wealth Club`,
    description: seguro.seo?.description || seguro.resumo,
  };
}

export default async function SeguroPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [seguro, seguros, config] = await Promise.all([
    getSeguroBySlug(slug),
    getSeguros(),
    getConfiguracoesGerais(),
  ]);

  if (!seguro) notFound();

  const relacionados = seguros
    .filter((s) => s.categoria === seguro.categoria && s.slug !== seguro.slug)
    .slice(0, 4);

  return (
    <>
      <ProductHero seguro={seguro} />

      {/* Descrição */}
      {!!seguro.descricao?.length && (
        <section className="relative overflow-hidden bg-white py-16 md:py-20">
          <RadialGlow className="-left-20 top-10 size-72 bg-brand-blue/10" />
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)]">
            <Reveal>
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
                  Análise do produto
                </p>
                <h2 className="font-heading text-3xl font-semibold text-brand-navy">
                  Para que serve o {seguro.title}
                </h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
                  {seguro.descricao.map((paragrafo, index) => (
                    <p key={index} className={index === 0 ? "text-xl font-medium text-brand-navy" : undefined}>
                      {paragrafo}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} y={30}>
              <aside className="rounded-2xl border border-brand-navy/10 bg-brand-soft/50 p-6 shadow-sm shadow-brand-navy/5">
                <p className="font-heading text-2xl font-semibold text-brand-navy">
                  Este seguro faz mais sentido quando você busca:
                </p>
                <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                  {[
                    "reduzir exposição financeira diante de imprevistos",
                    "tomar uma decisão com comparação clara de alternativas",
                    "ter acompanhamento consultivo antes e depois da contratação",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-brand-soft/40 py-16 md:py-20">
        <DotGrid id={`dots-analise-${seguro.slug}`} className="text-brand-navy/[0.04]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Consultoria
            </p>
            <h2 className="max-w-2xl font-heading text-3xl font-semibold text-brand-navy">
              A contratação passa por uma análise, não por uma escolha no escuro.
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {etapasAnalise.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.titulo} y={24}>
                  <div className="h-full rounded-xl border border-brand-navy/10 bg-white p-6 shadow-sm shadow-brand-navy/5">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-brand-blue text-white">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="font-semibold text-brand-navy">{item.titulo}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.descricao}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      {!!seguro.beneficios?.length && (
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-soft/20 to-white py-16 md:py-20">
          <DotGrid id={`dots-beneficios-${seguro.slug}`} className="text-brand-navy/[0.04]" />
          <div className="relative mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">Por que contratar</p>
              <h2 className="mb-4 max-w-2xl font-heading text-3xl font-semibold text-brand-navy">
                O que esta solução pode proteger na prática
              </h2>
              <p className="mb-10 max-w-2xl text-muted-foreground">
                Os benefícios variam conforme perfil e seguradora, mas estes pontos ajudam a entender o papel deste
                seguro dentro de uma estratégia de proteção.
              </p>
            </Reveal>
            <BenefitGrid beneficios={seguro.beneficios} />
          </div>
        </section>
      )}

      {/* Cotação */}
      <section id="cotacao" className="relative overflow-hidden py-16 md:py-20">
        <RadialGlow className="right-[-5rem] top-10 size-80 bg-brand-soft/80" />
        <Reveal className="relative">
          <QuoteBlock seguros={seguros} config={config} defaultServico={seguro.title} />
        </Reveal>
      </section>

      {/* Seguros relacionados */}
      {relacionados.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-brand-navy/10 pb-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
                  Próximas possibilidades
                </p>
                <h2 className="font-heading text-2xl font-semibold text-brand-navy">
                  Coberturas que podem complementar sua estratégia
                </h2>
              </div>
              <Button asChild variant="ghost" className="text-brand-blue hover:text-brand-blue-dark">
                <Link href="/servicos">
                  Ver todos os seguros
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relacionados.map((s) => (
              <InsuranceCard key={s._id} seguro={s} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
