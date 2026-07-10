import type { Depoimento } from "../types";

/**
 * Depoimentos fictícios e genéricos (sem nomes completos, empresas ou números
 * verificáveis) usados apenas até existirem depoimentos reais de clientes.
 * Mesmo texto já publicado no site WordPress atual, para manter consistência.
 */
export const depoimentosLocais: Depoimento[] = [
  {
    _id: "depoimento-1",
    nome: "Fernanda R.",
    titulo: "Cliente há 2 anos",
    texto:
      "A VT Wealth Club me ajudou a escolher o seguro de vida ideal para a minha família, com clareza em cada etapa do processo. Me senti segura desde a primeira conversa.",
  },
  {
    _id: "depoimento-2",
    nome: "Marcos A.",
    titulo: "Cliente VT Wealth Club",
    texto:
      "Troquei de plano de saúde com a ajuda da equipe e encontrei uma opção melhor sem perder qualidade no atendimento. Recomendo o cuidado que tiveram comigo.",
  },
  {
    _id: "depoimento-3",
    nome: "Juliana P.",
    titulo: "Cliente VT Wealth Club",
    texto:
      "Atendimento rápido e transparente na hora de acionar o seguro do meu carro. Fiquei tranquila em cada etapa, do primeiro contato até a resolução.",
  },
];
