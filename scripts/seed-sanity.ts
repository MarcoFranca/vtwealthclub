import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../src/sanity/env";
import { segurosLocais } from "../src/sanity/data/seguros";
import { depoimentosLocais } from "../src/sanity/data/depoimentos";
import { configuracoesGeraisLocais } from "../src/sanity/data/configuracoesGerais";

const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID não está definido em .env.local");
}
if (!token) {
  throw new Error("SANITY_API_TOKEN não está definido em .env.local (token com permissão Editor)");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function seed() {
  console.log(`Populando dataset "${dataset}" do projeto ${projectId}...`);

  for (const seguro of segurosLocais) {
    const { _id, slug, ...rest } = seguro;
    await client.createOrReplace({
      _id,
      _type: "seguro",
      ...rest,
      slug: { _type: "slug", current: slug },
    });
    console.log(`✓ seguro: ${seguro.title}`);
  }

  for (const depoimento of depoimentosLocais) {
    const { _id, ...rest } = depoimento;
    await client.createOrReplace({
      _id,
      _type: "depoimento",
      ...rest,
    });
    console.log(`✓ depoimento: ${depoimento.nome}`);
  }

  await client.createOrReplace({
    _id: "configuracoesGerais",
    _type: "configuracoesGerais",
    ...configuracoesGeraisLocais,
  });
  console.log("✓ configuracoesGerais");

  console.log("\nPronto! Conteúdo populado no Sanity.");
}

seed().catch((error) => {
  console.error("Falha ao popular o Sanity:", error);
  process.exit(1);
});
