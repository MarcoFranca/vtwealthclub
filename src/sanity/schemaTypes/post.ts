import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post do blog",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Resumo", type: "text", rows: 3 }),
    defineField({ name: "coverImage", title: "Imagem de capa", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Conteúdo", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "publishedAt", title: "Publicado em", type: "datetime" }),
  ],
  preview: {
    select: { title: "title" },
  },
});
