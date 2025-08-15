import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const l = new Logger('HTTP', { timestamp: true });

export function logger(req: Request, res: Response, next: NextFunction) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const ipString = Array.isArray(ip) ? ip.join(', ') : ip;

  if (req.originalUrl === '/api/public/health') {
    next();
    return;
  }

  const startTime = new Date();
  l.log(`[${req.method}] ${req.originalUrl} ${new Date().toLocaleString()} [${ipString}]`);
  res.on('finish', () => {
    const endTime = new Date();
    const reqTime: string = `${((endTime.getTime() - startTime.getTime()) / 1000).toFixed(0)}s${((endTime.getTime() - startTime.getTime()) % 1000).toFixed(0)}ms`;
    switch (String(res.statusCode)[0]) {
      case '5':
        l.error(`  ↳ code [${res.statusCode}] ${reqTime}\n`);
        break;
      case '4':
        l.warn(`  ↳ code [${res.statusCode}] ${reqTime}\n`);
        break;
      default:
        l.log(`  ↳ code [${res.statusCode}] ${reqTime}\n`);
        break;
    }
  });
  next();
}
