import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductHero } from "@/components/site/ProductHero";
import { BenefitGrid } from "@/components/site/BenefitGrid";
import { QuoteBlock } from "@/components/site/QuoteBlock";
import { InsuranceCard } from "@/components/site/InsuranceCard";
import { Reveal } from "@/components/site/motion/Reveal";
import { getConfiguracoesGerais, getSeguroBySlug, getSeguros } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const seguros = await getSeguros();
  return seguros.map((seguro) => ({ slug: seguro.slug }));
}

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
        <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <Reveal>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              {seguro.descricao.map((paragrafo, index) => (
                <p key={index} className={index === 0 ? "text-xl font-medium text-brand-navy" : undefined}>
                  {paragrafo}
                </p>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* Benefícios */}
      {!!seguro.beneficios?.length && (
        <section className="bg-muted/40 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">Por que contratar</p>
              <h2 className="mb-10 max-w-2xl font-heading text-3xl font-semibold text-brand-navy">
                O que este seguro oferece a você
              </h2>
            </Reveal>
            <BenefitGrid beneficios={seguro.beneficios} />
          </div>
        </section>
      )}

      {/* Cotação */}
      <section className="py-16 md:py-20">
        <Reveal>
          <QuoteBlock seguros={seguros} config={config} defaultServico={seguro.title} />
        </Reveal>
      </section>

      {/* Seguros relacionados */}
      {relacionados.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-heading text-2xl font-semibold text-brand-navy">Você também pode se interessar</h2>
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
