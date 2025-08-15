FROM node:22

WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.build.json ./

RUN npm i -g pnpm

RUN pnpm install --prod --frozen-lockfile
RUN pnpm install @nestjs/cli

COPY src/ ./src/

CMD [ "pnpm", "run", "start:dev" ]