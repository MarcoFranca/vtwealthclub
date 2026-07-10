import { defineField, defineType } from "sanity";

export const configuracoesGerais = defineType({
  name: "configuracoesGerais",
  title: "Configurações Gerais",
  type: "document",
  fields: [
    defineField({ name: "telefone", title: "Telefone", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp (com DDI, ex: 5521999152384)", type: "string" }),
    defineField({ name: "email", title: "E-mail de contato", type: "string" }),
    defineField({
      name: "enderecos",
      title: "Endereços",
      type: "array",
      of: [
        {
          type: "object",
          name: "endereco",
          fields: [
            defineField({ name: "nome", title: "Nome (ex: Sede Niterói)", type: "string" }),
            defineField({ name: "endereco", title: "Endereço completo", type: "text", rows: 2 }),
            defineField({ name: "principal", title: "Endereço principal (usado no mapa)", type: "boolean" }),
          ],
        },
      ],
    }),
    defineField({
      name: "redesSociais",
      title: "Redes sociais",
      type: "object",
      fields: [
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
      ],
    }),
    defineField({ name: "razaoSocial", title: "Razão social", type: "string" }),
    defineField({ name: "cnpj", title: "CNPJ", type: "string" }),
    defineField({ name: "inscricaoMunicipal", title: "Inscrição municipal", type: "string" }),
    defineField({ name: "susepPj", title: "Código SUSEP PJ", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Configurações Gerais" };
    },
  },
});
