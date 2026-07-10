import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { Button } from "@/components/ui/button";
import { getConfiguracoesGerais } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Contato | VT Wealth Club",
  description: "Fale com a VT Wealth Club por telefone, WhatsApp, e-mail ou visite nossa sede.",
};

export default async function ContatoPage() {
  const config = await getConfiguracoesGerais();
  const enderecoVisita = config.enderecos?.find((endereco) => endereco.principal) ?? config.enderecos?.[0];

  const mapsSrc = enderecoVisita
    ? `https://www.google.com/maps?q=${encodeURIComponent(enderecoVisita.endereco)}&output=embed`
    : undefined;

  return (
    <>
      <PageHero title="Contato" />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <h2 className="mb-1 text-2xl font-bold text-brand-navy">Envie Uma Mensagem</h2>
            <p className="mb-6 text-muted-foreground">
              Preencha o formulário abaixo com os seus dados e conte um pouco sobre o que você precisa. Nossa
              equipe entra em contato em até 1 dia útil.
            </p>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="mb-2 font-semibold text-brand-navy">Entre em Contato</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                Fale com a nossa equipe por telefone, WhatsApp ou e-mail. Respondemos rapidamente para ajudar você
                a encontrar a melhor solução em seguros e investimentos.
              </p>
              {config.telefone && (
                <a href={`tel:${config.telefone.replace(/\D/g, "")}`} className="flex items-center gap-2 text-brand-blue">
                  <Phone className="size-4" />
                  {config.telefone}
                </a>
              )}
            </div>

            {enderecoVisita && (
              <div>
                <h3 className="mb-2 font-semibold text-brand-navy">Faça uma visita</h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  Receba a equipe da VT Wealth Club com hora marcada em nossa sede.
                </p>
                <p className="flex items-start gap-2 text-sm text-brand-blue">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  {enderecoVisita.endereco}
                </p>
              </div>
            )}

            {config.whatsapp && (
              <div>
                <h3 className="mb-2 font-semibold text-brand-navy">Fale pelo WhatsApp</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  Prefere conversar agora? Fale com a gente pelo WhatsApp e receba atendimento rápido com um de
                  nossos corretores.
                </p>
                <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark">
                  <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4" />
                    Abrir WhatsApp
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>

        {mapsSrc && (
          <div className="mt-16 overflow-hidden rounded-2xl ring-1 ring-foreground/10">
            <iframe
              src={mapsSrc}
              width="100%"
              height="380"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização VT Wealth Club"
            />
          </div>
        )}
      </section>
    </>
  );
}
