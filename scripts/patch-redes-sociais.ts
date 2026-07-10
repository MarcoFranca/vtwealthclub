import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../src/sanity/env";

const token = process.env.SANITY_API_TOKEN;
if (!projectId || !token) {
  throw new Error("Faltam NEXT_PUBLIC_SANITY_PROJECT_ID ou SANITY_API_TOKEN em .env.local");
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

async function run() {
  const res = await client
    .patch("configuracoesGerais")
    .set({
      redesSociais: {
        facebook: "",
        linkedin: "https://www.linkedin.com/in/victortarouquella/",
        instagram: "https://www.instagram.com/vtwealthclub/",
      },
    })
    .commit();
  console.log("✓ Redes sociais atualizadas no Sanity:", res.redesSociais);
}

run().catch((e) => {
  console.error("Falha ao atualizar redes sociais:", e.message);
  process.exit(1);
});
