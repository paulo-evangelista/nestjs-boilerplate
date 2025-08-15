FROM node:22 AS build

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV CI=true

RUN npm i -g pnpm

COPY ../../package.json ../../pnpm-lock.yaml ./
COPY ../../tsconfig.json ../../tsconfig.build.json ../../nest-cli.json ./
COPY ../../src/ ./src/

RUN pnpm install --prod
RUN pnpm install @nestjs/cli
RUN pnpm run build


###################

FROM node:22-alpine AS production

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3002

CMD [ "node", "dist/main" ]
