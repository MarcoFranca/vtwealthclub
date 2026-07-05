import { defineField, defineType } from "sanity";

export const depoimento = defineType({
  name: "depoimento",
  title: "Depoimento",
  type: "document",
  fields: [
    defineField({ name: "nome", title: "Nome", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "titulo", title: "Título/cargo (ex: Cliente há 2 anos)", type: "string" }),
    defineField({ name: "texto", title: "Depoimento", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "foto", title: "Foto", type: "image", options: { hotspot: true } }),
    defineField({ name: "ordem", title: "Ordem de exibição", type: "number" }),
  ],
  preview: {
    select: { title: "nome", subtitle: "titulo" },
  },
});
