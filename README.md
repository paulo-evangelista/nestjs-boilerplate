# NestJS Boilerplate

## Como rodar o projeto

1. Instale o docker
2. Instale o [just](https://github.com/casey/just)
   - Mac: `brew install just`
   - Ubuntu/Deb: `sudo apt install just`
   - Universal: `npm install -g rust-just`
3. Duplique o arquivo `.env.sample` e renomeie para `.env`
4. Rode o comando `just up` para iniciar o projeto
5. Use `just` para ver todos os comandos disponíveis:
   - `just seed` para popular o banco de dados com os dados de exemplo
   - `just log` para ver os logs do container da API
   - `just down` para parar o projeto
6. Acesse a API em `http://localhost:3002/` (documentação Swagger)

## Ambiente de desenvolvimento

1. Mesmo usando Docker, instale as deps localmente para aquietar o Typescript: `pnpm i`
2. O Repo tem git hooks para linting e formatação. **Erros de linting bloqueiam o commit**.
3. Instale a extensão do VSCode [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) para ver erros de linting na IDE. Rode `just lint` para garantir que o código está ok.
4. O código é formatado com o [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) automaticamente quando você commita. Rode `just format` para formatar manualmente.
