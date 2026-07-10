"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Menu, X, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/site/SocialIcons";
import type { ConfiguracoesGerais, Seguro, Categoria } from "@/sanity/types";
import { categoriaLabels } from "@/sanity/types";

const CATEGORIA_ORDEM: Categoria[] = ["pessoa", "bem", "financeiro"];

export function Header({
  seguros,
  config,
}: {
  seguros: Seguro[];
  config: ConfiguracoesGerais;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [seguroDropdownOpen, setSeguroDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const porCategoria = CATEGORIA_ORDEM.map((categoria) => ({
    categoria,
    label: categoriaLabels[categoria],
    itens: seguros.filter((seguro) => seguro.categoria === categoria),
  })).filter((grupo) => grupo.itens.length > 0);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar — recolhe totalmente ao rolar (sem deixar margem branca) */}
      <div
        className={cn(
          "hidden overflow-hidden bg-white transition-all duration-300 md:block",
          scrolled ? "max-h-0 opacity-0" : "max-h-12 border-b border-border opacity-100"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-2 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center">
            {config.email && (
              <a href={`mailto:${config.email}`} className="flex items-center gap-2 hover:text-brand-blue">
                <Mail className="size-4" />
                {config.email}
              </a>
            )}
            {config.email && config.telefone && <span className="text-border">|</span>}
            {config.telefone && (
              <a
                href={`tel:${config.telefone.replace(/\D/g, "")}`}
                className="flex items-center gap-2 hover:text-brand-blue"
              >
                <Phone className="size-4" />
                {config.telefone}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Barra de navegação */}
      <div
        className={cn(
          "bg-brand-navy px-6 transition-all duration-300",
          scrolled ? "py-2 shadow-lg shadow-brand-navy/20" : "py-3"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/Design-sem-nome-7-e1717588448718-300x110.png"
              alt="VT Wealth Club"
              width={150}
              height={55}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setSeguroDropdownOpen(true)}
              onMouseLeave={() => setSeguroDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                onClick={() => setSeguroDropdownOpen((v) => !v)}
              >
                Seguros
                <ChevronDown className={cn("size-4 transition-transform", seguroDropdownOpen && "rotate-180")} />
              </button>
              {seguroDropdownOpen && (
                <div className="absolute left-0 top-full grid w-[560px] grid-cols-3 gap-4 rounded-xl bg-white p-5 shadow-xl ring-1 ring-foreground/10">
                  {porCategoria.map((grupo) => (
                    <div key={grupo.categoria}>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {grupo.label}
                      </p>
                      <ul className="space-y-1.5">
                        {grupo.itens.map((seguro) => (
                          <li key={seguro._id}>
                            <Link
                              href={`/seguros/${seguro.slug}`}
                              className="text-sm text-foreground hover:text-brand-blue"
                              onClick={() => setSeguroDropdownOpen(false)}
                            >
                              {seguro.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link href="/servicos" className="rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/10">
              Serviços
            </Link>
            <Link href="/contato" className="rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/10">
              Contato
            </Link>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="flex items-center gap-2">
              {config.redesSociais?.facebook && (
                <a href={config.redesSociais.facebook} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 p-1.5 text-white hover:bg-white/10">
                  <FacebookIcon className="size-4" />
                </a>
              )}
              {config.redesSociais?.linkedin && (
                <a href={config.redesSociais.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 p-1.5 text-white hover:bg-white/10">
                  <LinkedinIcon className="size-4" />
                </a>
              )}
              {config.redesSociais?.instagram && (
                <a href={config.redesSociais.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 p-1.5 text-white hover:bg-white/10">
                  <InstagramIcon className="size-4" />
                </a>
              )}
            </div>
            <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue-dark">
              <Link href="/contato">Peça sua cotação</Link>
            </Button>
          </div>

          <button
            className="text-white lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile menu — dentro da barra fixa */}
        {mobileOpen && (
          <div className="mx-auto mt-3 max-w-7xl border-t border-white/10 pt-4 lg:hidden">
            <nav className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Seguros</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {seguros.map((seguro) => (
                  <Link
                    key={seguro._id}
                    href={`/seguros/${seguro.slug}`}
                    className="text-sm text-white/90"
                    onClick={() => setMobileOpen(false)}
                  >
                    {seguro.title}
                  </Link>
                ))}
              </div>
              <hr className="border-white/10" />
              <Link href="/servicos" className="font-medium text-white" onClick={() => setMobileOpen(false)}>
                Serviços
              </Link>
              <Link href="/contato" className="font-medium text-white" onClick={() => setMobileOpen(false)}>
                Contato
              </Link>
              <Button asChild className="mt-2 bg-brand-blue hover:bg-brand-blue-dark">
                <Link href="/contato">Peça sua cotação</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
