import Link from "next/link";
import Image from "next/image";
import { Phone, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuoteBlock } from "@/components/site/QuoteBlock";
import { InsuranceCard } from "@/components/site/InsuranceCard";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/motion/Reveal";
import { HeroBackdrop } from "@/components/site/motion/HeroBackdrop";
import { VictorPhotos } from "@/components/site/VictorPhotos";
import { TopoLines, DotGrid } from "@/components/site/Decor";
import { getConfiguracoesGerais, getDepoimentos, getSeguros } from "@/sanity/lib/queries";

const pilares = [
  {
    titulo: "Você e sua família",
    descricao: "A família é a nossa maior prioridade. Conte com um expert para cuidar do seu maior bem!",
  },
  {
    titulo: "Sua empresa",
    descricao: "O futuro da sua empresa é para ser perene! Não deixe esse legado depender da sorte, conte conosco para protegê-lo.",
  },
  {
    titulo: "Sua carreira",
    descricao: "Planos personalizados para garantir a proteção total da sua atividade profissional, seja qual for a sua área de atuação.",
  },
  {
    titulo: "Seu patrimônio",
    descricao: "As suas conquistas não foram em vão. Proteja os seus bens com as melhores proteções e condições do mercado.",
  },
];

export default async function HomePage() {
  const [seguros, depoimentos, config] = await Promise.all([
    getSeguros(),
    getDepoimentos(),
    getConfiguracoesGerais(),
  ]);

  const destaques = seguros.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy pb-44 pt-28">
        {/* Foto de fundo em alta — visível, com overlay para leitura do texto */}
        <div className="absolute inset-0">
          <Image
            src="/photos/hero-familia.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay: forte no topo (nav) e na base (card), respira no meio */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/85 via-brand-navy/45 to-brand-navy" />
          {/* Vinheta lateral suave para dar foco ao texto central */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--brand-navy)_90%)] opacity-60" />
        </div>
        <HeroBackdrop />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Vida e Previdência
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-heading text-5xl font-semibold text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] md:text-6xl">
              Protegendo o que mais importa
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/90 drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)]">
              Seu bem mais valioso, com o futuro protegido!
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue-dark">
                <Link href="/contato">Peça sua cotação</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
                <Link href="/servicos">Encontre um corretor</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/15 pt-8 text-white">
              {[
                { valor: "Desde 2014", rotulo: "no mercado" },
                { valor: `${seguros.length} tipos`, rotulo: "de seguro" },
                { valor: "RJ + SP", rotulo: "atendimento presencial" },
              ].map((item) => (
                <div key={item.rotulo} className="text-center">
                  <p className="font-heading text-2xl font-semibold">{item.valor}</p>
                  <p className="text-xs uppercase tracking-wide text-white/60">{item.rotulo}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quote block, overlapping hero */}
      <div className="relative -mt-28">
        <Reveal delay={0.15} y={40}>
          <QuoteBlock seguros={seguros} config={config} />
        </Reveal>
      </div>

      {/* Sobre Victor Tarouquella */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Sobre Victor Tarouquella
            </p>
            <h2 className="font-heading text-4xl font-semibold text-brand-navy">
              Sócio-Fundador da VT Wealth Club
            </h2>
            <p className="mt-4 text-muted-foreground">
              Victor Tarouquella é um profissional dedicado e apaixonado por ajudar pessoas a alcançarem segurança
              financeira e proteção para o futuro. Como Sócio-Fundador da VT Wealth Club, Victor traz uma visão
              única e inovadora, sempre focada em oferecer as melhores soluções em seguros e investimentos para
              seus clientes.
            </p>
            <h3 className="mt-6 font-semibold text-brand-navy">Compromisso com a Excelência</h3>
            <p className="mt-2 text-muted-foreground">
              Com uma carreira sólida em instituições renomadas, Victor sempre busca proporcionar um atendimento de
              alta qualidade. Sua filosofia de trabalho é baseada em integridade, confiabilidade e justiça, valores
              que ele considera essenciais para construir relacionamentos duradouros e de confiança com seus
              clientes.
            </p>
            <h3 className="mt-6 font-semibold text-brand-navy">Experiência a Serviço do Cliente</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li><strong className="text-brand-navy">Financial Advisor na Dominion Capital Strategies:</strong> gestão de investimentos internacionais e liderança de equipes em Londres.</li>
              <li><strong className="text-brand-navy">Assessor de Investimentos na XP Investimentos:</strong> planejamento financeiro personalizado.</li>
              <li><strong className="text-brand-navy">Sócio na Farol Capital Investimentos:</strong> investimentos diversificados e gestão de fluxo de caixa.</li>
              <li><strong className="text-brand-navy">Corretor Franqueado Life Planner® na Prudential do Brasil:</strong> planejamento financeiro e gestão de riscos.</li>
            </ul>
          </Reveal>
          <Reveal delay={0.15} y={40} className="md:pl-6">
            <VictorPhotos />
          </Reveal>
        </div>
      </section>

      {/* Categorias de seguro */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-soft/30 to-white py-16 md:py-24">
        <DotGrid id="dots-seguros" className="text-brand-navy/[0.06]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">Seguros</p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="max-w-xl font-heading text-4xl font-semibold text-brand-navy">
                Melhores seguros para todos.
              </h2>
              <Button asChild variant="default" className="bg-brand-blue hover:bg-brand-blue-dark">
                <Link href="/servicos">Veja mais</Link>
              </Button>
            </div>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Desde 2014, nossa companhia de seguros tem protegido sonhos. Enfrentamos tempestades, reconstruímos
              vidas e protegemos legados. Empoderando gerações, nosso compromisso inabalável permanece firme.
            </p>
          </Reveal>
          <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destaques.map((seguro) => (
              <StaggerItem key={seguro._id}>
                <InsuranceCard seguro={seguro} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA consultoria financeira */}
      <section className="texture-grain relative overflow-hidden bg-gradient-to-r from-brand-navy via-brand-navy-light to-brand-navy py-12 md:py-16">
        <TopoLines className="text-white/[0.07]" />
        <Reveal className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-4xl font-semibold text-white">Experiência em Consultoria Financeira</h2>
            <p className="mt-2 max-w-xl text-white/80">
              Confie em nossa cobertura para lhe proporcionar a tranquilidade e a confiança que você merece.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue-dark">
              <Link href="/contato">Encontre um corretor</Link>
            </Button>
            {config.telefone && (
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
                <a href={`tel:${config.telefone.replace(/\D/g, "")}`}>
                  <Phone className="size-4" />
                  {config.telefone}
                </a>
              </Button>
            )}
          </div>
        </Reveal>
      </section>

      {/* Pilares */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <Reveal>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">Serviços</p>
          <h2 className="max-w-2xl font-heading text-4xl font-semibold text-brand-navy">
            Somos especializados no que mais importa, a sua proteção!
          </h2>
        </Reveal>
        <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pilares.map((pilar) => (
            <StaggerItem key={pilar.titulo}>
              <div className="h-full rounded-xl bg-brand-soft p-6 transition-transform hover:-translate-y-1">
                <ShieldCheck className="mb-3 size-8 text-brand-blue" />
                <h3 className="font-semibold text-brand-navy">{pilar.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pilar.descricao}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Depoimentos */}
      <section className="texture-grain relative overflow-hidden bg-brand-navy py-16 md:py-24">
        <TopoLines className="text-white/[0.06]" />
        <div className="absolute -left-32 top-1/2 size-96 -translate-y-1/2 rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          <Reveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">Testemunhos</p>
            <h2 className="font-heading text-4xl font-semibold text-white">Histórias reais, satisfações reais</h2>
            <p className="mt-4 text-white/80">
              Depoimentos de clientes que confiaram na VT Wealth Club para proteger o que mais importa.
            </p>
          </Reveal>
          <Reveal delay={0.15} y={40}>
            <TestimonialCarousel depoimentos={depoimentos} />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <Reveal>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">FAQs</p>
          <h2 className="max-w-2xl font-heading text-4xl font-semibold text-brand-navy">
            Respostas especializadas para suas dúvidas de seguro
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            As FAQs da companhia de seguros abordam perguntas comuns sobre cobertura, sinistros, prêmios e detalhes
            da apólice para a clareza dos clientes.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <FaqAccordion />
        </Reveal>
      </section>
    </>
  );
}
