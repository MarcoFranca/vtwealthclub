import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    pergunta: "Quais tipos de cobertura sua empresa oferece?",
    resposta:
      "Nossa empresa oferece uma ampla gama de coberturas de seguro para atender a diversas necessidades, incluindo automóvel, residencial, vida, saúde, empresarial, propriedade, responsabilidade civil e muito mais. Esforçamo-nos para fornecer opções de cobertura abrangentes, sob medida para os requisitos específicos de cada cliente.",
  },
  {
    pergunta: "Como posso registrar um sinistro de seguro?",
    resposta:
      "Basta entrar em contato com a nossa equipe pelo telefone, e-mail ou WhatsApp informando os dados da sua apólice. Vamos orientar você sobre a documentação necessária e acompanhar todo o processo junto à seguradora até a resolução do sinistro.",
  },
  {
    pergunta: "Como os prêmios de seguro são determinados?",
    resposta:
      "O valor do prêmio varia conforme o tipo de cobertura, o perfil de risco, o valor segurado e as condições oferecidas por cada seguradora. Comparamos as opções do mercado para encontrar a melhor relação entre cobertura e custo para o seu caso.",
  },
  {
    pergunta: "Posso personalizar minha apólice de seguro para atender às minhas necessidades específicas?",
    resposta:
      "Sim. Trabalhamos para entender a sua realidade e ajustar coberturas, limites e franquias de acordo com o que realmente faz sentido para você, evitando pagar por proteções que não são necessárias.",
  },
  {
    pergunta: "O que acontece se eu precisar fazer alterações na minha apólice de seguro?",
    resposta:
      "É só nos avisar. Cuidamos de solicitar a alteração junto à seguradora, seja para atualizar dados, ajustar coberturas ou incluir novos beneficiários, mantendo você informado em cada etapa.",
  },
];

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl gap-3">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`faq-${index}`} className="rounded-xl border-b-0 bg-brand-navy px-4 text-white">
          <AccordionTrigger className="text-white hover:no-underline [&_svg]:text-white">
            {faq.pergunta}
          </AccordionTrigger>
          <AccordionContent className="text-white/80">{faq.resposta}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
