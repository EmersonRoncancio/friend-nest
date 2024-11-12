import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publication } from './entities/publication.entity';
import { CreatePublicationDto } from './dto/create-publication.dto';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel(Publication.name)
    private readonly publicationModel: Model<Publication>,
  ) {}

  async createPublication(
    createPostDto: CreatePublicationDto,
    userId: string,
    files: string[],
  ) {
    try {
      const newPublcation = await this.publicationModel.create({
        author: userId,
        contentDescription: createPostDto.contentDescription,
        media: files,
      });
      return newPublcation;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
