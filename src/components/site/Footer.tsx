import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/site/SocialIcons";
import { TopoLines } from "@/components/site/Decor";
import type { ConfiguracoesGerais, Seguro } from "@/sanity/types";

export function Footer({
  seguros,
  config,
}: {
  seguros: Seguro[];
  config: ConfiguracoesGerais;
}) {
  const enderecoPrincipal = config.enderecos?.find((e) => e.principal) ?? config.enderecos?.[0];

  return (
    <footer className="texture-grain relative overflow-hidden bg-brand-navy text-white">
      <div className="relative overflow-hidden">
        <TopoLines className="text-white/[0.05]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-brand-blue">Nossa Empresa</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/" className="hover:text-white">Sobre Nós</Link></li>
              <li><Link href="/servicos" className="hover:text-white">Serviços</Link></li>
              <li><Link href="/contato" className="hover:text-white">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-brand-blue">Seguros</h3>
            <ul className="space-y-2 text-sm text-white/80">
              {seguros.slice(0, 8).map((seguro) => (
                <li key={seguro._id}>
                  <Link href={`/seguros/${seguro.slug}`} className="hover:text-white">
                    {seguro.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-brand-blue">Entre em Contato</h3>
            <ul className="space-y-3 text-sm text-white/80">
              {config.telefone && (
                <li className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0" />
                  <a href={`tel:${config.telefone.replace(/\D/g, "")}`} className="hover:text-white">
                    {config.telefone}
                  </a>
                </li>
              )}
              {config.email && (
                <li className="flex items-center gap-2">
                  <Mail className="size-4 shrink-0" />
                  <a href={`mailto:${config.email}`} className="hover:text-white">
                    {config.email}
                  </a>
                </li>
              )}
              {enderecoPrincipal && (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  <span>{enderecoPrincipal.endereco}</span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-brand-blue">Siga-Nos</h3>
            <div className="flex items-center gap-2">
              {config.redesSociais?.facebook && (
                <a href={config.redesSociais.facebook} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 p-2 hover:bg-white/10">
                  <FacebookIcon className="size-4" />
                </a>
              )}
              {config.redesSociais?.linkedin && (
                <a href={config.redesSociais.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 p-2 hover:bg-white/10">
                  <LinkedinIcon className="size-4" />
                </a>
              )}
              {config.redesSociais?.instagram && (
                <a href={config.redesSociais.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 p-2 hover:bg-white/10">
                  <InstagramIcon className="size-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-brand-navy">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-6 text-xs text-white/60 md:flex-row">
          <div className="space-y-1 text-center md:text-left">
            {config.razaoSocial && <p>Razão Social: {config.razaoSocial}</p>}
            {config.cnpj && <p>CNPJ: {config.cnpj}</p>}
            {enderecoPrincipal && <p>Endereço: {enderecoPrincipal.endereco}</p>}
            <p className="pt-1 text-white/45">
              Desenvolvido por{" "}
              <span className="font-medium text-white/70">Marco Tullio França</span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <Image
              src="/logo/Design-sem-nome-7-e1717588448718-300x110.png"
              alt="VT Wealth Club"
              width={120}
              height={44}
              className="h-8 w-auto opacity-80"
            />
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
              Protecao patrimonial com atendimento consultivo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
