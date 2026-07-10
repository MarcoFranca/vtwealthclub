# VT Wealth Club

Site institucional da VT Wealth Club construído com Next.js, com conteúdo gerenciado por Sanity e envio de formulários via SMTP (e-mail hospedado no cPanel/RapidCloud).

## Visao geral

- Frontend em Next.js App Router.
- Conteudo principal vindo do Sanity.
- Fallback local para o site continuar funcionando mesmo sem credenciais do Sanity.
- Formularios de contato e cotacao enviados por e-mail via SMTP (nodemailer).
- Sanity Studio embutido no projeto em `/studio`.

## Stack principal

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Sanity
- next-sanity
- nodemailer
- Zod

## Rotas principais

- `/` pagina inicial
- `/servicos` listagem de servicos e seguros
- `/seguros/[slug]` detalhe de cada seguro
- `/contato` pagina de contato
- `/studio` painel administrativo do Sanity Studio

## APIs internas

- `POST /api/contato` envia mensagem do formulario de contato
- `POST /api/cotacao` envia pedido de cotacao
- As APIs tratam timeouts ambíguos do SMTP como recebidos (`202`) para evitar feedback falso de erro quando o e-mail foi entregue.

## Como rodar localmente

1. Instale as dependencias.
2. Crie um `.env.local` com base em `.env.example`.
3. Rode o projeto:

```bash
pnpm dev
```

Para abrir somente o Studio localmente:

```bash
pnpm studio
```

## Variaveis de ambiente

### Sanity

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`

Se `NEXT_PUBLIC_SANITY_PROJECT_ID` nao estiver definido, o projeto usa conteudo local em `src/sanity/data`.

### SMTP

- `SMTP_HOST`
- `SMTP_PORT` (465 = SSL implicito, 587 = STARTTLS)
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM_EMAIL` opcional (usa `SMTP_USER` por padrao)
- `SMTP_TO_EMAIL` opcional (usa `SMTP_USER` por padrao)

Use a conta de e-mail ja hospedada no cPanel/RapidCloud (cPanel > Email Accounts > [conta] > Connect Devices mostra host/porta/usuario).

Sem `SMTP_HOST` + `SMTP_USER` + `SMTP_PASSWORD`, os endpoints dos formularios falham de forma controlada e retornam erro amigavel.

## Sanity no projeto

### Configuracao

- Config principal: [sanity.config.ts](E:/Autentika/Projetos/Programas/vtwealthclub/sanity.config.ts:1)
- CLI: [sanity.cli.ts](E:/Autentika/Projetos/Programas/vtwealthclub/sanity.cli.ts:1)
- Env helper: [src/sanity/env.ts](E:/Autentika/Projetos/Programas/vtwealthclub/src/sanity/env.ts:1)

### Studio

O Studio esta integrado ao app em:

- [src/app/studio/[[...tool]]/page.tsx](E:/Autentika/Projetos/Programas/vtwealthclub/src/app/studio/[[...tool]]/page.tsx:1)
- [src/app/studio/[[...tool]]/StudioClient.tsx](E:/Autentika/Projetos/Programas/vtwealthclub/src/app/studio/[[...tool]]/StudioClient.tsx:1)

Observacao tecnica:

- o Studio foi isolado em um Client Component para evitar erro de build do Turbopack com a importacao server-side do Sanity Studio.

Depois de deploy na Vercel, o acesso esperado e:

- [https://vtwealthclub.vercel.app/studio](https://vtwealthclub.vercel.app/studio)

### Schemas cadastrados

- `seguro`
- `depoimento`
- `parceiro`
- `configuracoesGerais`
- `post`

Campos institucionais em `configuracoesGerais`:

- razão social
- CNPJ
- inscrição municipal
- código SUSEP PJ
- endereços, telefone, WhatsApp, e-mail e redes sociais

Indice dos schemas:

- [src/sanity/schemaTypes/index.ts](E:/Autentika/Projetos/Programas/vtwealthclub/src/sanity/schemaTypes/index.ts:1)

### Consulta de dados

As consultas centralizadas ficam em:

- [src/sanity/lib/queries.ts](E:/Autentika/Projetos/Programas/vtwealthclub/src/sanity/lib/queries.ts:1)

Regra atual:

- com Sanity configurado, busca dados remotos
- sem Sanity configurado, usa dados locais em `src/sanity/data`

Isso evita quebrar o site durante setup inicial, manutencao ou desenvolvimento sem CMS configurado.

## Formularios e e-mail

Os formularios enviam dados para rotas internas que validam o payload com Zod e disparam e-mail via SMTP (nodemailer), usando a conta de e-mail do dominio hospedada no cPanel/RapidCloud.

Arquivos principais:

- [src/app/api/contato/route.ts](E:/Autentika/Projetos/Programas/vtwealthclub/src/app/api/contato/route.ts:1)
- [src/app/api/cotacao/route.ts](E:/Autentika/Projetos/Programas/vtwealthclub/src/app/api/cotacao/route.ts:1)
- [src/lib/mailer.ts](E:/Autentika/Projetos/Programas/vtwealthclub/src/lib/mailer.ts:1)

## Estrutura resumida

```text
src/
  app/
    (site)/            rotas publicas do site
    api/               endpoints internos
    studio/            Sanity Studio embutido
  components/
    site/              componentes visuais do site
    ui/                componentes de interface reutilizaveis
  lib/                 integracoes e utilitarios gerais
  sanity/
    data/              fallback local de conteudo
    lib/               client, image builder e queries
    schemaTypes/       schemas do CMS
    types.ts           tipagens de conteudo
scripts/
  seed-sanity.ts       carga inicial de conteudo no Sanity
.agents/
  WORKFLOW.md          preferencias operacionais do projeto
```

## Scripts disponiveis

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm studio
pnpm studio:build
pnpm studio:deploy
pnpm seed
```

## Fluxo de manutencao recomendado

### Alteracoes de conteudo

- Preferir ajustes no Sanity quando o campo ja estiver modelado.
- Se um texto, bloco ou lista ainda estiver hardcoded, mover para schema quando fizer sentido para o cliente editar.

### Alteracoes estruturais

- Antes de mexer em rotas, build, deploy, CMS, autenticacao ou configuracoes centrais, consultar a documentacao da tecnologia envolvida.
- Validar no codigo se a implementacao final segue a abordagem recomendada.

### Documentacao

- Toda mudanca importante deve atualizar esta documentacao ou criar uma complementar quando necessario.

## Observacoes importantes

- O projeto ainda tinha um `README` generico de create-next-app; este arquivo agora passa a ser a documentacao base do repositorio.
- O acesso ao Studio depende de novo deploy apos a integracao da rota `/studio`.
- Se houver erro 404 em `/studio`, conferir se a versao publicada na Vercel ja contem a rota criada neste repositorio.
- Header e footer passaram por refinamento visual para melhorar alinhamento, leitura institucional e acabamento premium.
- As transicoes entre secoes usam veus, gradientes e brilhos sutis para evitar cortes visuais chapados sem poluir a interface.
- A Home prioriza narrativa consultiva: proposta clara no hero, formulario como analise personalizada, processo em 3 etapas e sinais de autoridade do fundador.
- A pagina de Servicos e as paginas de seguros tambem seguem a abordagem consultiva, guiando o usuario por necessidade, analise e proximos passos.
- Os dados institucionais oficiais ficam em `src/sanity/data/configuracoesGerais.ts` como fallback local e tambem podem ser editados no Sanity em `configuracoesGerais`.
