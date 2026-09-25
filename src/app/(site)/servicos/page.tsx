import type { Metadata } from "next";
import { Building2, ShieldCheck, Users, WalletCards } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { InsuranceCard } from "@/components/site/InsuranceCard";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SeguradorasMarquee, type LogoSeguradora } from "@/components/site/SeguradorasMarquee";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/motion/Reveal";
import { getParceiros, getSeguros } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { categoriaLabels, type Categoria } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Serviços | VT Wealth Club",
  description: "Conheça todas as soluções em seguros e planejamento financeiro da VT Wealth Club.",
};

const CATEGORIA_ORDEM: Categoria[] = ["pessoa", "bem", "financeiro"];

const caminhosDeProtecao = [
  { titulo: "Família e sucessão", descricao: "Proteja renda, herança e tranquilidade para quem depende de você.", icon: Users },
  { titulo: "Empresa e sócios", descricao: "Reduza riscos operacionais, societários e impactos de imprevistos.", icon: Building2 },
  { titulo: "Patrimônio e bens", descricao: "Organize coberturas para veículos, imóveis, viagens e conquistas relevantes.", icon: ShieldCheck },
  { titulo: "Planejamento financeiro", descricao: "Conecte seguros, saúde, previdência e decisões patrimoniais em uma estratégia.", icon: WalletCards },
];

export default async function ServicosPage() {
  const [seguros, parceiros] = await Promise.all([getSeguros(), getParceiros()]);

  const logos: LogoSeguradora[] = parceiros.map((p) => ({
    nome: p.nome,
    logoUrl: urlForImage(p.logo)?.width(200).height(80).url(),
  }));

  const grupos = CATEGORIA_ORDEM.map((categoria) => ({
    categoria,
    label: categoriaLabels[categoria],
    itens: seguros.filter((seguro) => seguro.categoria === categoria),
  })).filter((grupo) => grupo.itens.length > 0);

  return (
    <>
      <PageHero
        title="Soluções para proteger cada fase da sua vida"
        subtitle="Seguro certo começa com entendimento. Comparamos as melhores seguradoras e organizamos a proteção para família, empresa, patrimônio e planejamento financeiro."
      />

      <SeguradorasMarquee logos={logos} onDark />

      {/* Por onde começar */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              kicker="Por onde começar"
              title="Escolha primeiro"
              muted="o que você precisa proteger."
              description="Depois da conversa inicial, a recomendação deixa de ser uma lista de produtos e vira uma estratégia compatível com o seu momento."
            />
          </Reveal>
          <StaggerGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {caminhosDeProtecao.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.titulo}>
                  <div className="h-full rounded-2xl border border-brand-navy/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand-blue">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-brand-navy">{item.titulo}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.descricao}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Lista de seguros por categoria */}
      <section className="bg-brand-surface py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {grupos.map((grupo, gi) => (
            <div key={grupo.categoria} className={gi > 0 ? "mt-16" : undefined}>
              <Reveal>
                <SectionHeading kicker="Categoria" title={grupo.label} />
              </Reveal>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {grupo.itens.map((seguro) => (
                  <InsuranceCard key={seguro._id} seguro={seguro} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <SectionHeading
              align="center"
              kicker="Dúvidas frequentes"
              title="Respostas para as suas"
              muted="principais dúvidas de seguro."
            />
          </Reveal>
          <Reveal className="mt-10">
            <FaqAccordion />
          </Reveal>
        </div>
      </section>
    </>
  );
}
