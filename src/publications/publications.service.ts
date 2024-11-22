import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publication } from './entities/publication.entity';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { cloudinaryAdapter } from 'src/common/adapters/cloudinary.adapter';
import * as fs from 'fs-extra';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

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
      const imagesPromise = await cloudinaryAdapter.uploadImageArr(
        files,
        'publications',
      );

      files.forEach(async (filePath) => {
        const exists = await fs.pathExists(filePath);
        if (exists) {
          await fs.unlink(filePath);
        }
      });
      const images = await Promise.all(imagesPromise);
      const urlImages = images.map((image) => image.secure_url);

      const newPublcation = await this.publicationModel.create({
        author: userId,
        contentDescription: createPostDto.contentDescription,
        media: urlImages,
      });
      return newPublcation;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getPublicationsAll(paginationdto: PaginationDto) {
    console.log(paginationdto);
    const { page, limit } = paginationdto;
    try {
      const publications = await this.publicationModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-__v');

      return publications;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
