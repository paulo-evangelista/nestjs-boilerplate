import { Logger } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export default function addLogger(serviceName: string) {
  return new Logger(serviceName, { timestamp: true });
}

export function setupLogger(appName: string): winston.LoggerOptions {
  return {
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'DD/MM HH:mm:ss',
          }),
          nestWinstonModuleUtilities.format.nestLike(appName, {
            colors: true,
            prettyPrint: true,
            processId: false,
            appName: false,
          }),
        ),
      }),
      new winston.transports.File({
        level: 'debug',
        filename: 'logs.log',
        maxsize: 5000000,
        maxFiles: 1,
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'DD/MM HH:mm:ss',
          }),
          nestWinstonModuleUtilities.format.nestLike(appName, {
            colors: false,
            prettyPrint: true,
            processId: false,
            appName: false,
          }),
        ),
      }),
    ],
  };
}
