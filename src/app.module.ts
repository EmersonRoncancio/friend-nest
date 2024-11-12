import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { envConfigs } from './common/configs/env.configs';
import { PublicationsModule } from './publications/publications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfigs],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: process.env.DB_NAME,
    }),
    AuthModule,
    CommonModule,
    PublicationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
