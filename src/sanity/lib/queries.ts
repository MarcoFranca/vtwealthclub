import { client } from "./client";
import { isSanityConfigured } from "../env";
import { segurosLocais } from "../data/seguros";
import { depoimentosLocais } from "../data/depoimentos";
import { parceirosLocais } from "../data/parceiros";
import { configuracoesGeraisLocais } from "../data/configuracoesGerais";
import type { ConfiguracoesGerais, Depoimento, Parceiro, Seguro } from "../types";

const seguroProjection = `{
  _id,
  title,
  "slug": slug.current,
  categoria,
  heroImage,
  resumo,
  descricao,
  beneficios,
  ordem,
  seo
}`;

export async function getSeguros(): Promise<Seguro[]> {
  if (!isSanityConfigured) {
    return [...segurosLocais].sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));
  }
  return client!.fetch(`*[_type == "seguro"] | order(ordem asc) ${seguroProjection}`);
}

export async function getSeguroBySlug(slug: string): Promise<Seguro | null> {
  if (!isSanityConfigured) {
    return segurosLocais.find((seguro) => seguro.slug === slug) ?? null;
  }
  return client!.fetch(
    `*[_type == "seguro" && slug.current == $slug][0] ${seguroProjection}`,
    { slug }
  );
}

export async function getDepoimentos(): Promise<Depoimento[]> {
  if (!isSanityConfigured) {
    return depoimentosLocais;
  }
  return client!.fetch(`*[_type == "depoimento"] | order(ordem asc)`);
}

export async function getParceiros(): Promise<Parceiro[]> {
  if (!isSanityConfigured) {
    return parceirosLocais;
  }
  return client!.fetch(`*[_type == "parceiro"]`);
}

export async function getConfiguracoesGerais(): Promise<ConfiguracoesGerais> {
  if (!isSanityConfigured) {
    return configuracoesGeraisLocais;
  }
  const remote = await client!.fetch<ConfiguracoesGerais | null>(
    `*[_type == "configuracoesGerais"][0]`
  );
  return remote ?? configuracoesGeraisLocais;
}
