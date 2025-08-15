import { Module } from '@nestjs/common';
import config from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { InternalModule } from './internal/internal.module';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: config().db.host,
      username: config().db.user,
      password: config().db.password,
      database: config().db.database,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InternalModule,
    ExampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
