import { defineField, defineType } from "sanity";

export const parceiro = defineType({
  name: "parceiro",
  title: "Parceiro",
  type: "document",
  fields: [
    defineField({ name: "nome", title: "Nome", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "logo", title: "Logo", type: "image", validation: (rule) => rule.required() }),
    defineField({ name: "url", title: "Site do parceiro", type: "url" }),
  ],
  preview: {
    select: { title: "nome" },
  },
});
