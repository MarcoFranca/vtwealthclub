import type { Image } from "sanity";

export type Categoria = "pessoa" | "bem" | "financeiro";

export interface Beneficio {
  icone?: string;
  titulo: string;
  descricao?: string;
}

export interface Seguro {
  _id: string;
  title: string;
  slug: string;
  categoria: Categoria;
  heroImage?: Image;
  resumo?: string;
  descricao?: string[];
  beneficios?: Beneficio[];
  ordem?: number;
  seo?: { title?: string; description?: string };
}

export interface Depoimento {
  _id: string;
  nome: string;
  titulo?: string;
  texto: string;
  foto?: Image;
}

export interface Parceiro {
  _id: string;
  nome: string;
  logo?: Image;
  url?: string;
}

export interface Endereco {
  nome?: string;
  endereco: string;
  principal?: boolean;
}

export interface ConfiguracoesGerais {
  telefone?: string;
  whatsapp?: string;
  email?: string;
  enderecos?: Endereco[];
  redesSociais?: { facebook?: string; linkedin?: string; instagram?: string };
  razaoSocial?: string;
  cnpj?: string;
  inscricaoMunicipal?: string;
  susepPj?: string;
}

export const categoriaLabels: Record<Categoria, string> = {
  pessoa: "Seguros de Pessoa",
  bem: "Seguros de Bens",
  financeiro: "Saúde e Planejamento Financeiro",
};
