/**
 * Mapa de fotos locais (estilo de vida) por slug de seguro. Usado como
 * fallback quando o seguro ainda não tem `heroImage` cadastrada no Sanity.
 *
 * As imagens ficam em /public/images/seguros e são geradas/curadas pela
 * agência. Assim que o cliente subir as fotos oficiais no Sanity, o
 * `heroImage` tem prioridade e este mapa deixa de ser usado.
 */
export const seguroImagens: Record<string, string> = {
  "seguro-de-vida": "/images/seguros/seguro-de-vida.webp",
  "plano-de-saude": "/images/seguros/plano-de-saude.webp",
  "seguro-de-automovel": "/images/seguros/seguro-de-automovel.webp",
  "seguro-de-diaria-de-incapacidade-temporaria":
    "/images/seguros/seguro-de-diaria-de-incapacidade-temporaria.webp",
  "seguro-de-diaria-por-internacao-hospitalar":
    "/images/seguros/seguro-de-diaria-por-internacao-hospitalar.webp",
  "seguro-rc-profissional": "/images/seguros/seguro-rc-profissional.webp",
  "seguro-de-acidentes-pessoais": "/images/seguros/seguro-de-acidentes-pessoais.webp",
  "seguro-funeral": "/images/seguros/seguro-funeral.webp",
  "seguro-educacional": "/images/seguros/seguro-educacional.webp",
  "seguro-viagem": "/images/seguros/seguro-viagem.webp",
  "seguro-de-celular": "/images/seguros/seguro-de-celular.webp",
  "seguro-residencial": "/images/seguros/seguro-residencial.webp",
  "seguro-fianca-locaticia": "/images/seguros/seguro-fianca-locaticia.webp",
  "seguro-de-transporte-de-cargas": "/images/seguros/seguro-de-transporte-de-cargas.webp",
  "previdencia-privada": "/images/seguros/previdencia-privada.webp",
  "consorcios": "/images/seguros/consorcios.webp",
};

/** Foto local para o slug, ou undefined se não houver. */
export function fotoLocalSeguro(slug?: string): string | undefined {
  return slug ? seguroImagens[slug] : undefined;
}
