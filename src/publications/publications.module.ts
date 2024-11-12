import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Publication, PublicationSchema } from './entities/publication.entity';
import { User, UserSchema } from 'src/auth/entities/auth.entity';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Publication.name,
        schema: PublicationSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
export class PublicationsModule {}
