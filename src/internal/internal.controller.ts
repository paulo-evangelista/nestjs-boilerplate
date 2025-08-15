import { Controller, Delete, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import fs from 'fs';
import path from 'path';

@ApiTags('⚙️ Internal')
@Controller('internal')
export class InternalController {
  @Get('health')
  @ApiOperation({ summary: 'Healthcheck endpoint' })
  health() {
    return { status: 'ok' };
  }

  @Get('logs')
  @ApiOperation({ summary: 'Get the logs of the application' })
  getLogs() {
    const logPath = path.join(process.cwd(), 'logs.log');
    try {
      const logs = fs.readFileSync(logPath, 'utf8');
      return logs;
    } catch {
      return { error: 'Failed to read logs file' };
    }
  }

  @Delete('logs')
  @ApiOperation({ summary: 'Clear the logs of the application' })
  clearLogs() {
    const logPath = path.join(process.cwd(), 'logs.log');
    try {
      fs.writeFileSync(logPath, '--- Logs cleared at ' + new Date().toLocaleString() + ' ---\n\n');
      return { message: 'Logs cleared successfully' };
    } catch {
      return { error: 'Failed to clear logs file' };
    }
  }
}
