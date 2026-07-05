import { defineField, defineType } from "sanity";

export const seguro = defineType({
  name: "seguro",
  title: "Seguro",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome do seguro",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Pessoa", value: "pessoa" },
          { title: "Bem", value: "bem" },
          { title: "Financeiro", value: "financeiro" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Imagem de destaque",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "resumo",
      title: "Resumo (usado no card e na introdução)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "descricao",
      title: "Descrição completa (um parágrafo por item)",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "beneficios",
      title: "Benefícios",
      type: "array",
      of: [
        {
          type: "object",
          name: "beneficio",
          fields: [
            defineField({ name: "icone", title: "Ícone (nome lucide-react)", type: "string" }),
            defineField({ name: "titulo", title: "Título", type: "string" }),
            defineField({ name: "descricao", title: "Descrição", type: "text", rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: "ordem",
      title: "Ordem de exibição",
      type: "number",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título SEO", type: "string" }),
        defineField({ name: "description", title: "Descrição SEO", type: "text", rows: 2 }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "categoria" },
  },
});
