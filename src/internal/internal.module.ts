import { Module } from '@nestjs/common';
import { InternalController } from './internal.controller';

@Module({
  controllers: [InternalController],
  providers: [],
})
export class InternalModule {}
