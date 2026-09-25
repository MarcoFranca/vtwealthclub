import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, MessageCircle, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductHero } from "@/components/site/ProductHero";
import { BenefitGrid } from "@/components/site/BenefitGrid";
import { QuoteBlock } from "@/components/site/QuoteBlock";
import { InsuranceCard } from "@/components/site/InsuranceCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/motion/Reveal";
import { getConfiguracoesGerais, getSeguroBySlug, getSeguros } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const seguros = await getSeguros();
  return seguros.map((seguro) => ({ slug: seguro.slug }));
}

const etapasAnalise = [
  { titulo: "Entender seu perfil", descricao: "Antes da proposta, avaliamos renda, patrimônio, dependentes, empresa e prioridades.", icon: MessageCircle },
  { titulo: "Ajustar cobertura e custo", descricao: "A recomendação considera proteção real, orçamento, carências, limites e finalidade do seguro.", icon: ClipboardCheck },
  { titulo: "Acompanhar a decisão", descricao: "Depois da contratação, a proteção pode ser revisada conforme sua vida ou negócio evolui.", icon: ShieldCheck },
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

export default async function SeguroPage({ params }: { params: Promise<{ slug: string }> }) {
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
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)]">
            <Reveal>
              <SectionHeading kicker="Análise do produto" title={`Para que serve o ${seguro.title}`} />
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
                {seguro.descricao.map((paragrafo, index) => (
                  <p key={index} className={index === 0 ? "text-xl font-medium text-brand-navy" : undefined}>
                    {paragrafo}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} y={30}>
              <aside className="rounded-3xl border border-brand-navy/10 bg-brand-surface p-6">
                <p className="font-heading text-xl font-bold text-brand-navy">
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

      {/* Processo */}
      <section className="bg-brand-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              kicker="Consultoria"
              title="A contratação passa por uma análise,"
              muted="não por uma escolha no escuro."
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {etapasAnalise.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.titulo} y={24}>
                  <div className="h-full rounded-2xl border border-brand-navy/10 bg-white p-6">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-brand-blue text-white">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-brand-navy">{item.titulo}</h3>
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
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <SectionHeading
                kicker="Por que contratar"
                title="O que esta solução"
                muted="pode proteger na prática."
                description="Os benefícios variam conforme perfil e seguradora, mas estes pontos ajudam a entender o papel deste seguro dentro de uma estratégia de proteção."
              />
            </Reveal>
            <div className="mt-10">
              <BenefitGrid beneficios={seguro.beneficios} />
            </div>
          </div>
        </section>
      )}

      {/* Cotação */}
      <section id="cotacao" className="bg-brand-surface py-16 md:py-20">
        <Reveal>
          <QuoteBlock seguros={seguros} config={config} defaultServico={seguro.title} />
        </Reveal>
      </section>

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <SectionHeading kicker="Próximas possibilidades" title="Coberturas que podem complementar" muted="a sua estratégia." />
                <Button asChild variant="ghost" className="rounded-full text-brand-blue hover:text-brand-blue-dark">
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
          </div>
        </section>
      )}
    </>
  );
}
