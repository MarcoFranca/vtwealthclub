import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

// Só cria o client real quando houver credenciais do Sanity configuradas.
// Sem isso, createClient() lança erro de validação mesmo sem nunca chamar .fetch().
export const client: SanityClient | null = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
