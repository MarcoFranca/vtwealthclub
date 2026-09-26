import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, HeartHandshake, LifeBuoy, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuoteBlock } from "@/components/site/QuoteBlock";
import { InsuranceCard } from "@/components/site/InsuranceCard";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SeguradorasMarquee, type LogoSeguradora } from "@/components/site/SeguradorasMarquee";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/motion/Reveal";
import { getConfiguracoesGerais, getDepoimentos, getParceiros, getSeguros } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

const beneficios = [
  {
    icon: HeartHandshake,
    titulo: "Atendimento personalizado",
    descricao: "Entendemos a necessidade de cada cliente antes de indicar qualquer apólice. Nada de pacote pronto.",
  },
  {
    icon: ShieldCheck,
    titulo: "As melhores seguradoras",
    descricao: "Comparamos as principais seguradoras do mercado para garantir a melhor cobertura e condição.",
  },
  {
    icon: LifeBuoy,
    titulo: "Suporte completo em sinistros",
    descricao: "Acompanhamos todo o processo junto à seguradora, do aviso à liquidação, para não sair no papel.",
  },
];

export default async function HomePage() {
  const [seguros, depoimentos, config, parceiros] = await Promise.all([
    getSeguros(),
    getDepoimentos(),
    getConfiguracoesGerais(),
    getParceiros(),
  ]);

  const destaques = seguros.slice(0, 8);
  const logos: LogoSeguradora[] = parceiros.map((p) => ({
    nome: p.nome,
    logoUrl: urlForImage(p.logo)?.width(200).height(80).url(),
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-16 md:grid-cols-2 md:pb-24 md:pt-24">
          <Reveal>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-white/70">
              <span className="inline-block size-2 rounded-[2px] bg-brand-blue" />
              Consultoria em seguros e planejamento
            </p>
            <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Protegendo o que <span className="text-white/45">mais importa.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/70">
              Cotamos o seu seguro em várias seguradoras, mostramos a diferença entre elas e você decide com o preço
              na mão.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-brand-blue px-6 hover:bg-brand-blue-dark">
                <Link href="/contato">Fazer cotação</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10"
              >
                <Link href="/servicos">Ver soluções</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15} y={30}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative col-span-1 row-span-2 aspect-[3/4] overflow-hidden rounded-3xl bg-brand-navy-light">
                <Image
                  src="/images/hero-familia.webp"
                  alt="Família protegida pela VT Wealth Club"
                  fill
                  priority
                  sizes="(min-width: 768px) 25vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-blue/20">
                <Image
                  src="/photos/victor-placa.jpg"
                  alt="Victor Tarouquella"
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="relative flex aspect-square flex-col justify-end overflow-hidden rounded-3xl p-5 text-white">
                <Image
                  src="/photos/hero-familia-hd.jpg"
                  alt="Clientes protegidos pela VT Wealth Club"
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/70 to-brand-blue/30" />
                <div className="relative">
                  <p className="font-heading text-3xl font-bold">10 anos</p>
                  <p className="mt-1 text-sm text-white/85">protegendo famílias e negócios</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Esteira de seguradoras */}
        <SeguradorasMarquee logos={logos} onDark />
      </section>

      {/* Benefícios */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
          {beneficios.map((b) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.titulo} y={24}>
                <div className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                    <Icon className="size-5 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-brand-navy">{b.titulo}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.descricao}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Produtos */}
      <section className="bg-brand-surface py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              align="center"
              kicker="Na VT Wealth Club, cada cliente é único"
              title="Proteção personalizada,"
              muted="soluções únicas para cada cliente."
            />
          </Reveal>
          <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destaques.map((seguro) => (
              <StaggerItem key={seguro._id}>
                <InsuranceCard seguro={seguro} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="rounded-full bg-brand-blue px-7 hover:bg-brand-blue-dark">
              <Link href="/servicos">Todas as soluções</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cotação */}
      <section className="bg-white py-16 md:py-20">
        <Reveal>
          <QuoteBlock seguros={seguros} config={config} />
        </Reveal>
      </section>

      {/* Sobre Victor */}
      <section className="bg-brand-surface py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <Reveal y={30}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="/photos/victor-placa.jpg"
                alt="Victor Tarouquella, sócio-fundador da VT Wealth Club"
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
                <p className="font-heading text-sm font-bold text-brand-navy">Life Planner®</p>
                <p className="text-xs text-muted-foreground">Prudential do Brasil</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              kicker="Quem cuida de você"
              title="Victor Tarouquella,"
              muted="sócio-fundador da VT Wealth Club."
              description="Com uma carreira sólida em instituições renomadas, Victor une experiência em seguros e investimentos para oferecer proteção e planejamento sob medida — com integridade, clareza e acompanhamento de verdade."
            />
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                "Corretor Franqueado Life Planner® na Prudential do Brasil",
                "Assessor de Investimentos com passagem por XP e Farol Capital",
                "Experiência internacional em gestão de investimentos (Londres)",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <SectionHeading
              align="center"
              onDark
              kicker="Não sabe por onde começar?"
              title="Fale com um especialista"
              muted="e receba a proteção certa para o seu momento."
              description="Em uma conversa rápida você entende o que já está protegido, o que ficou de fora e por onde começar."
            />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-brand-blue px-7 hover:bg-brand-blue-dark">
                <Link href="/contato">
                  Fazer cotação
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              {config.whatsapp && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/30 bg-transparent px-7 text-white hover:bg-white/10"
                >
                  <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noreferrer">
                    Falar no WhatsApp
                  </a>
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          <Reveal>
            <SectionHeading
              kicker="Testemunhos"
              title="Histórias reais,"
              muted="satisfações reais."
              description="Depoimentos de clientes que confiaram na VT Wealth Club para proteger o que mais importa."
            />
          </Reveal>
          <Reveal delay={0.15} y={30}>
            <TestimonialCarousel depoimentos={depoimentos} onDark={false} />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-surface py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <SectionHeading
              align="center"
              kicker="Dúvidas frequentes"
              title="Respostas para as suas"
              muted="principais dúvidas de seguro."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <FaqAccordion />
          </Reveal>
        </div>
      </section>
    </>
  );
}
