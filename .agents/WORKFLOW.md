# Preferencias de Workflow

Estas instrucoes registram como trabalhar neste projeto.

## Git

- Sempre que criar um arquivo novo, executar `git add` desse arquivo no mesmo fluxo.
- Depois de alteracoes relevantes, conferir o estado no Git para evitar deixar arquivos importantes de fora.

## Documentacao

- Sempre que fizer uma alteracao importante ou criar algo novo no projeto, criar ou atualizar uma documentacao correspondente.
- A documentacao deve explicar o suficiente para manutencao futura sem virar texto desnecessario.

## Mudancas estruturais

- Antes de mexer em algo estrutural, consultar a documentacao relevante do framework, biblioteca ou servico envolvido.
- Confirmar no codigo se a implementacao continua alinhada com a documentacao antes de concluir a tarefa.
- Priorizar seguranca e consistencia para reduzir o risco de regressao.

## Aplicacao pratica

- Se a solicitacao do usuario implicar criacao de arquivos, adicionar os arquivos novos ao stage ao final da implementacao.
- Se a solicitacao tocar arquitetura, rotas, integracoes, build, deploy, CMS, autenticacao ou configuracoes centrais, validar a abordagem com a documentacao antes de editar.
