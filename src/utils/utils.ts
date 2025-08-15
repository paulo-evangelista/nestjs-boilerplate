import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { randomBytes } from 'crypto';
import config from 'src/config/config';

export async function sendLogTeams(message: string) {
  const endpoint = config().microsoftTeamsApi.url;
  const token = config().microsoftTeamsApi.key;
  const sendTo = config().microsoftTeamsApi.sendTo;

  if (!endpoint || !token || !sendTo) {
    console.warn('[sendLogTeams] Variáveis de ambiente não configuradas');
    return;
  }

  const dataSender = {
    message: `${message}`,
    users: sendTo.split(','),
    contentType: 'html',
    importance: 'normal',
  };

  const json = JSON.stringify(dataSender);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  const options = {
    method: 'POST',
    headers: headers,
    body: json,
  };

  await fetch(endpoint, options);
}

export function setupSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(`📝 NestJS Boilerplate`)
    .setDescription('The Best NestJS Boilerplate Ever')
    .setVersion(randomBytes(3).toString('hex'))
    .build();
  const document = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, document);
}
