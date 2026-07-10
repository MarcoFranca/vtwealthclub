import type { Seguro } from "../types";

/**
 * Conteúdo local usado enquanto o Sanity não estiver configurado (ver isSanityConfigured
 * em src/sanity/env.ts). Depois que o projeto Sanity existir, popular o Studio com este
 * mesmo conteúdo e a busca em src/sanity/lib/queries.ts passa a usar os dados reais.
 *
 * Vida, Plano de Saúde e Automóvel reaproveitam o texto real que já existia no site em
 * WordPress. Os demais são textos de marketing genéricos, sem especificar coberturas,
 * carências ou condições contratuais — o cliente deve revisar e ajustar via Sanity Studio
 * antes de publicar oficialmente cada produto.
 */
export const segurosLocais: Seguro[] = [
  {
    _id: "seguro-de-vida",
    title: "Seguro de Vida",
    slug: "seguro-de-vida",
    categoria: "pessoa",
    ordem: 1,
    resumo:
      "O Seguro de Vida garante o pagamento de uma indenização aos beneficiários que você escolher, assegurando que sua família mantenha o padrão de vida mesmo na sua ausência.",
    descricao: [
      "Proteja quem você ama e deixe um legado de segurança. O Seguro de Vida garante o pagamento de uma indenização aos beneficiários que você escolher, assegurando que sua família mantenha o padrão de vida e honre seus compromissos mesmo na sua ausência. É um dos pilares de um bom planejamento financeiro.",
      "Estruturamos a cobertura de acordo com a sua realidade: renda atual, dívidas, dependentes e objetivos de longo prazo, prevendo cenários de falecimento ou invalidez e preservando o padrão de vida e os compromissos assumidos pela família.",
      "Mais do que uma apólice, o Seguro de Vida é uma decisão de cuidado. Ajudamos você a definir o capital adequado e a indicar corretamente os beneficiários.",
    ],
    beneficios: [
      {
        icone: "ShieldCheck",
        titulo: "Cobertura sob medida",
        descricao: "Capital segurado ajustado à sua renda e às suas responsabilidades, sem pagar por coberturas que você não precisa.",
      },
      {
        icone: "HeartPulse",
        titulo: "Coberturas complementares",
        descricao: "Possibilidade de incluir doenças graves, assistência funeral e antecipação por doença terminal, conforme o plano escolhido.",
      },
      {
        icone: "Users",
        titulo: "Beneficiários bem definidos",
        descricao: "Ajudamos a indicar corretamente quem recebe a indenização, evitando dor de cabeça para a família na hora que mais importa.",
      },
    ],
  },
  {
    _id: "plano-de-saude",
    title: "Plano de Saúde",
    slug: "plano-de-saude",
    categoria: "financeiro",
    ordem: 2,
    resumo:
      "Ajudamos você a encontrar o plano que melhor equilibra rede credenciada, abrangência e custo, seja para uso individual, familiar ou empresarial.",
    descricao: [
      "Cuide da sua saúde com a cobertura certa para cada fase da vida. Ter um bom plano de saúde é garantir acesso a consultas, exames, internações e atendimentos de urgência sem comprometer o orçamento da família.",
      "Na VT Wealth Club, comparamos as principais operadoras do mercado para indicar a opção com a melhor relação entre rede credenciada, abrangência geográfica e custo — seja para uso individual, familiar ou empresarial.",
    ],
    beneficios: [
      {
        icone: "Stethoscope",
        titulo: "Comparação entre operadoras",
        descricao: "Analisamos as principais operadoras do mercado para indicar a opção mais adequada ao seu perfil.",
      },
      {
        icone: "Users",
        titulo: "Individual, familiar ou empresarial",
        descricao: "Encontramos o plano ideal considerando o tamanho e a necessidade do seu grupo familiar ou da sua empresa.",
      },
      {
        icone: "Wallet",
        titulo: "Equilíbrio entre custo e cobertura",
        descricao: "Buscamos a melhor relação entre mensalidade, rede credenciada e abrangência de atendimento.",
      },
    ],
  },
  {
    _id: "seguro-de-automovel",
    title: "Seguro de Automóvel",
    slug: "seguro-de-automovel",
    categoria: "bem",
    ordem: 3,
    resumo:
      "O Seguro de Automóvel protege seu veículo contra colisão, roubo, furto e danos a terceiros, além de oferecer assistência 24 horas.",
    descricao: [
      "Dirija com tranquilidade e proteção completa. O Seguro de Automóvel protege seu veículo contra colisão, roubo, furto e danos a terceiros, além de oferecer assistência 24 horas. É a segurança necessária para você dirigir com tranquilidade no dia a dia.",
      "Comparamos as principais seguradoras para indicar a melhor combinação de cobertura, assistência e preço para o seu perfil de condutor e para o seu veículo.",
    ],
    beneficios: [
      {
        icone: "Car",
        titulo: "Cobertura completa",
        descricao: "Proteção contra colisão, roubo, furto e danos a terceiros, ajustada ao valor e ao uso do seu veículo.",
      },
      {
        icone: "LifeBuoy",
        titulo: "Assistência 24 horas",
        descricao: "Guincho, chaveiro e apoio em caso de pane ou acidente, a qualquer hora do dia.",
      },
      {
        icone: "Wallet",
        titulo: "Melhor custo-benefício",
        descricao: "Comparação entre seguradoras para encontrar a combinação ideal de cobertura, assistência e preço.",
      },
    ],
  },
  {
    _id: "seguro-de-diaria-de-incapacidade-temporaria",
    title: "Seguro de Diária de Incapacidade Temporária (DIT)",
    slug: "seguro-de-diaria-de-incapacidade-temporaria",
    categoria: "pessoa",
    ordem: 4,
    resumo:
      "Garante uma renda diária caso você fique temporariamente incapacitado de trabalhar por acidente ou doença, ajudando a manter suas contas em dia durante a recuperação.",
    descricao: [
      "Um imprevisto de saúde não deveria comprometer o seu sustento. O Seguro de Diária por Incapacidade Temporária (DIT) garante o pagamento de uma renda diária enquanto você estiver afastado do trabalho por acidente ou doença.",
      "É uma proteção pensada para autônomos, profissionais liberais e qualquer pessoa que dependa da própria capacidade de trabalhar para manter a renda do mês.",
    ],
    beneficios: [
      {
        icone: "CalendarClock",
        titulo: "Renda durante o afastamento",
        descricao: "Diária paga enquanto durar a incapacidade temporária, ajudando a manter as contas em dia.",
      },
      {
        icone: "ShieldCheck",
        titulo: "Proteção para autônomos",
        descricao: "Especialmente relevante para quem não tem estabilidade de renda garantida em caso de afastamento.",
      },
      {
        icone: "FileCheck",
        titulo: "Processo de acionamento simples",
        descricao: "Acompanhamos você na hora de acionar o seguro, com orientação sobre a documentação necessária.",
      },
    ],
  },
  {
    _id: "seguro-de-diaria-por-internacao-hospitalar",
    title: "Seguro de Diária por Internação Hospitalar (DIH)",
    slug: "seguro-de-diaria-por-internacao-hospitalar",
    categoria: "pessoa",
    ordem: 5,
    resumo:
      "Paga uma diária por cada dia de internação hospitalar, ajudando a cobrir despesas extras que o plano de saúde não cobre.",
    descricao: [
      "Internações trazem custos que vão além do tratamento médico: deslocamento da família, perda de renda, despesas do dia a dia. O Seguro de Diária por Internação Hospitalar (DIH) paga um valor por cada dia de internação, dando fôlego financeiro nesse momento.",
      "Pode ser contratado de forma complementar ao plano de saúde, sem substituí-lo, como uma camada extra de proteção financeira.",
    ],
    beneficios: [
      {
        icone: "CalendarClock",
        titulo: "Diária por dia internado",
        descricao: "Valor pago para cada dia de internação hospitalar, independente da cobertura do plano de saúde.",
      },
      {
        icone: "HeartPulse",
        titulo: "Complementa o plano de saúde",
        descricao: "Ajuda a cobrir despesas que não são reembolsadas pelo convênio médico.",
      },
      {
        icone: "Users",
        titulo: "Apoio para a família",
        descricao: "Reduz o impacto financeiro de deslocamento e apoio à família durante o período de internação.",
      },
    ],
  },
  {
    _id: "seguro-rc-profissional",
    title: "Seguro RC Profissional (Responsabilidade Civil)",
    slug: "seguro-rc-profissional",
    categoria: "financeiro",
    ordem: 6,
    resumo:
      "Protege profissionais e empresas contra reclamações de terceiros por erros, omissões ou danos causados no exercício da atividade profissional.",
    descricao: [
      "No exercício de qualquer atividade profissional, erros e imprevistos podem acontecer. O Seguro de Responsabilidade Civil Profissional protege você e o seu negócio contra reclamações de terceiros decorrentes de erros, omissões ou danos causados no exercício da profissão.",
      "Indicado para consultores, prestadores de serviço, profissionais liberais e empresas que respondem por danos causados a clientes ou parceiros no curso do trabalho.",
    ],
    beneficios: [
      {
        icone: "Briefcase",
        titulo: "Proteção da sua atividade",
        descricao: "Cobertura para reclamações relacionadas a erros ou omissões no exercício profissional.",
      },
      {
        icone: "ShieldCheck",
        titulo: "Tranquilidade para o seu negócio",
        descricao: "Reduz o impacto financeiro de eventuais processos ou indenizações a terceiros.",
      },
      {
        icone: "FileCheck",
        titulo: "Cobertura sob medida",
        descricao: "Estruturada de acordo com a atividade e o porte do seu negócio ou profissão.",
      },
    ],
  },
  {
    _id: "seguro-de-acidentes-pessoais",
    title: "Seguro de Acidentes Pessoais",
    slug: "seguro-de-acidentes-pessoais",
    categoria: "pessoa",
    ordem: 7,
    resumo:
      "Garante indenização em caso de morte acidental ou invalidez permanente causada por acidente, com um custo geralmente mais acessível que o seguro de vida tradicional.",
    descricao: [
      "Acidentes acontecem sem aviso. O Seguro de Acidentes Pessoais garante o pagamento de uma indenização em caso de morte acidental ou invalidez permanente causada por acidente, geralmente com um custo mais acessível que o seguro de vida tradicional.",
      "É uma proteção complementar interessante para quem pratica esportes, viaja com frequência ou simplesmente quer uma camada extra de segurança financeira para a família.",
    ],
    beneficios: [
      {
        icone: "ShieldCheck",
        titulo: "Indenização por acidente",
        descricao: "Cobertura para morte acidental ou invalidez permanente por acidente.",
      },
      {
        icone: "Wallet",
        titulo: "Custo acessível",
        descricao: "Geralmente mais barato que o seguro de vida tradicional, por cobrir um risco mais específico.",
      },
      {
        icone: "Users",
        titulo: "Proteção complementar",
        descricao: "Pode ser somado a outras coberturas para reforçar a proteção da família.",
      },
    ],
  },
  {
    _id: "seguro-funeral",
    title: "Seguro Funeral",
    slug: "seguro-funeral",
    categoria: "pessoa",
    ordem: 8,
    resumo:
      "Cobre as despesas de assistência funeral em caso de falecimento, evitando que a família precise organizar recursos em um momento delicado.",
    descricao: [
      "Em um momento delicado, os detalhes práticos não deveriam ser um peso a mais para a família. O Seguro Funeral cobre as despesas de assistência funeral em caso de falecimento do titular ou de dependentes incluídos na apólice.",
      "É uma forma simples e acessível de garantir que a parte prática seja resolvida rapidamente, sem sobrecarregar financeiramente quem fica.",
    ],
    beneficios: [
      {
        icone: "HeartPulse",
        titulo: "Assistência completa",
        descricao: "Cobertura das despesas de assistência funeral do titular e de dependentes incluídos.",
      },
      {
        icone: "Users",
        titulo: "Apoio à família",
        descricao: "Reduz a carga prática e financeira da família em um momento difícil.",
      },
      {
        icone: "Wallet",
        titulo: "Custo acessível",
        descricao: "Uma das coberturas mais acessíveis para incluir no seu planejamento de proteção pessoal.",
      },
    ],
  },
  {
    _id: "seguro-educacional",
    title: "Seguro Educacional",
    slug: "seguro-educacional",
    categoria: "pessoa",
    ordem: 9,
    resumo:
      "Garante a continuidade dos estudos dos seus filhos, cobrindo mensalidades escolares caso você venha a faltar ou fique incapacitado de trabalhar.",
    descricao: [
      "A educação dos seus filhos não deveria depender apenas da sua presença. O Seguro Educacional garante o pagamento das mensalidades escolares em caso de falecimento ou invalidez do responsável financeiro.",
      "É uma forma de proteger o futuro acadêmico das crianças e adolescentes da família, independentemente do que aconteça com quem hoje sustenta essa despesa.",
    ],
    beneficios: [
      {
        icone: "GraduationCap",
        titulo: "Continuidade dos estudos",
        descricao: "Mensalidades escolares cobertas em caso de falecimento ou invalidez do responsável.",
      },
      {
        icone: "Users",
        titulo: "Proteção para os filhos",
        descricao: "Garante que o plano educacional da família não dependa só de uma fonte de renda.",
      },
      {
        icone: "ShieldCheck",
        titulo: "Planejamento de longo prazo",
        descricao: "Se encaixa no planejamento financeiro familiar como proteção específica para a educação.",
      },
    ],
  },
  {
    _id: "seguro-viagem",
    title: "Seguro Viagem",
    slug: "seguro-viagem",
    categoria: "pessoa",
    ordem: 10,
    resumo:
      "Cobertura de assistência médica, bagagem extraviada e outros imprevistos durante viagens nacionais e internacionais.",
    descricao: [
      "Viajar com tranquilidade é poder aproveitar sem se preocupar com imprevistos. O Seguro Viagem oferece cobertura de assistência médica, hospitalar, odontológica, bagagem extraviada e outras situações inesperadas durante viagens nacionais e internacionais.",
      "Muitos destinos internacionais exigem seguro viagem com cobertura mínima obrigatória — ajudamos você a escolher a opção certa para o seu roteiro.",
    ],
    beneficios: [
      {
        icone: "Plane",
        titulo: "Assistência no exterior",
        descricao: "Cobertura médica, hospitalar e odontológica durante viagens nacionais e internacionais.",
      },
      {
        icone: "ShieldCheck",
        titulo: "Cobertura por destino",
        descricao: "Indicamos a cobertura adequada às exigências do país de destino.",
      },
      {
        icone: "FileCheck",
        titulo: "Bagagem e imprevistos",
        descricao: "Proteção para extravio de bagagem, atraso de voo e outras situações inesperadas.",
      },
    ],
  },
  {
    _id: "seguro-de-celular",
    title: "Seguro de Celular",
    slug: "seguro-de-celular",
    categoria: "pessoa",
    ordem: 11,
    resumo:
      "Protege seu smartphone contra roubo, furto qualificado, quebra acidental e danos por líquido.",
    descricao: [
      "O celular virou uma ferramenta essencial do dia a dia — e também um alvo frequente de roubo e furto. O Seguro de Celular protege o seu aparelho contra roubo, furto qualificado, quebra acidental de tela e danos por líquido, conforme o plano contratado.",
      "Uma proteção simples de contratar que evita o gasto inesperado com a troca ou o conserto do aparelho.",
    ],
    beneficios: [
      {
        icone: "Smartphone",
        titulo: "Roubo e furto qualificado",
        descricao: "Cobertura para os cenários mais comuns de perda do aparelho.",
      },
      {
        icone: "ShieldCheck",
        titulo: "Quebra e danos por líquido",
        descricao: "Proteção contra acidentes do dia a dia, conforme o plano escolhido.",
      },
      {
        icone: "Wallet",
        titulo: "Contratação simples",
        descricao: "Processo rápido de contratação, com opções para diferentes modelos e faixas de preço.",
      },
    ],
  },
  {
    _id: "seguro-residencial",
    title: "Seguro Residencial / Patrimonial",
    slug: "seguro-residencial",
    categoria: "bem",
    ordem: 12,
    resumo:
      "Protege sua casa ou imóvel contra incêndio, roubo, danos elétricos e outros imprevistos que ameacem o seu patrimônio.",
    descricao: [
      "A casa é, para a maioria das famílias, o bem mais valioso construído ao longo da vida. O Seguro Residencial protege o imóvel e os bens dentro dele contra incêndio, roubo, danos elétricos, vendaval e outros imprevistos.",
      "Também oferecemos opções de seguro patrimonial para imóveis comerciais e outros bens de maior valor, com cobertura ajustada ao perfil de risco de cada patrimônio.",
    ],
    beneficios: [
      {
        icone: "Home",
        titulo: "Proteção do imóvel",
        descricao: "Cobertura contra incêndio, roubo, danos elétricos e outros imprevistos estruturais.",
      },
      {
        icone: "ShieldCheck",
        titulo: "Bens dentro de casa",
        descricao: "Proteção para móveis, eletrônicos e outros bens conforme o plano contratado.",
      },
      {
        icone: "Building2",
        titulo: "Imóveis comerciais e patrimônio",
        descricao: "Opções de cobertura para imóveis comerciais e bens de maior valor.",
      },
    ],
  },
  {
    _id: "seguro-fianca-locaticia",
    title: "Seguro Fiança Locatícia",
    slug: "seguro-fianca-locaticia",
    categoria: "bem",
    ordem: 13,
    resumo:
      "Substitui o fiador tradicional na hora de alugar um imóvel, garantindo ao proprietário o pagamento do aluguel em caso de inadimplência.",
    descricao: [
      "Alugar um imóvel sem precisar de fiador é possível. O Seguro Fiança Locatícia garante ao proprietário o pagamento do aluguel e encargos em caso de inadimplência do inquilino, substituindo a exigência de um fiador tradicional.",
      "Facilita o processo de locação tanto para quem aluga — que não depende de encontrar um fiador — quanto para o proprietário, que tem a garantia de recebimento assegurada pela seguradora.",
    ],
    beneficios: [
      {
        icone: "FileCheck",
        titulo: "Sem necessidade de fiador",
        descricao: "Facilita a aprovação do aluguel para quem não tem fiador disponível.",
      },
      {
        icone: "ShieldCheck",
        titulo: "Garantia para o proprietário",
        descricao: "Assegura o pagamento do aluguel e encargos em caso de inadimplência.",
      },
      {
        icone: "Building2",
        titulo: "Processo mais ágil",
        descricao: "Agiliza a locação ao dispensar a burocracia de comprovação de fiador.",
      },
    ],
  },
  {
    _id: "seguro-de-transporte-de-cargas",
    title: "Seguro de Transporte de Cargas",
    slug: "seguro-de-transporte-de-cargas",
    categoria: "bem",
    ordem: 14,
    resumo:
      "Protege mercadorias e produtos durante o transporte rodoviário, marítimo ou aéreo contra roubo, avarias e acidentes.",
    descricao: [
      "Toda operação de transporte envolve risco. O Seguro de Transporte de Cargas protege mercadorias durante o trajeto rodoviário, marítimo ou aéreo contra roubo, furto, avarias e acidentes.",
      "Indicado para empresas que despacham ou recebem cargas com regularidade e precisam de previsibilidade financeira diante de eventuais perdas durante o transporte.",
    ],
    beneficios: [
      {
        icone: "Truck",
        titulo: "Proteção em qualquer modal",
        descricao: "Cobertura para transporte rodoviário, marítimo ou aéreo, conforme a operação da empresa.",
      },
      {
        icone: "ShieldCheck",
        titulo: "Roubo, furto e avarias",
        descricao: "Cobertura para os principais riscos durante o trajeto da mercadoria.",
      },
      {
        icone: "Briefcase",
        titulo: "Previsibilidade para o negócio",
        descricao: "Reduz o impacto financeiro de eventuais perdas durante o transporte.",
      },
    ],
  },
  {
    _id: "previdencia-privada",
    title: "Previdência Privada",
    slug: "previdencia-privada",
    categoria: "financeiro",
    ordem: 15,
    resumo:
      "Planejamento de longo prazo para complementar a aposentadoria, com opções de acordo com o seu perfil de investidor e objetivos financeiros.",
    descricao: [
      "Planejar o futuro é construir hoje a liberdade financeira de amanhã. A Previdência Privada é uma ferramenta de longo prazo para complementar a aposentadoria e alcançar objetivos financeiros específicos, com regras de tributação e resgate diferenciadas da poupança tradicional.",
      "Com experiência no mercado financeiro, ajudamos você a escolher entre os planos disponíveis (PGBL ou VGBL) e a estruturar aportes de acordo com o seu perfil de investidor e horizonte de tempo.",
    ],
    beneficios: [
      {
        icone: "PiggyBank",
        titulo: "Planejamento de longo prazo",
        descricao: "Estrutura de aportes pensada para complementar a aposentadoria ou outros objetivos futuros.",
      },
      {
        icone: "Landmark",
        titulo: "PGBL ou VGBL",
        descricao: "Orientação sobre qual modalidade se encaixa melhor na sua situação fiscal e financeira.",
      },
      {
        icone: "Wallet",
        titulo: "Perfil de investidor",
        descricao: "Aportes e alocação ajustados ao seu apetite a risco e horizonte de tempo.",
      },
    ],
  },
  {
    _id: "consorcios",
    title: "Consórcios",
    slug: "consorcios",
    categoria: "financeiro",
    ordem: 16,
    resumo:
      "Uma alternativa de planejamento para adquirir bens ou imóveis sem juros, através de cartas de crédito com parcelas planejadas.",
    descricao: [
      "Nem todo objetivo financeiro exige financiamento com juros altos. O Consórcio é uma alternativa de planejamento para adquirir um imóvel, veículo ou outros bens através de uma carta de crédito, com parcelas organizadas ao longo do tempo.",
      "Ajudamos você a entender se o consórcio se encaixa no seu momento e objetivo, comparando prazos, taxas de administração e formas de contemplação disponíveis no mercado.",
    ],
    beneficios: [
      {
        icone: "Landmark",
        titulo: "Sem juros de financiamento",
        descricao: "Alternativa para planejar a compra de bens sem as taxas de juros tradicionais.",
      },
      {
        icone: "PiggyBank",
        titulo: "Parcelas planejadas",
        descricao: "Organização financeira de médio a longo prazo para atingir o objetivo desejado.",
      },
      {
        icone: "FileCheck",
        titulo: "Comparação de opções",
        descricao: "Ajudamos a comparar prazos, taxas de administração e formas de contemplação.",
      },
    ],
  },
];
