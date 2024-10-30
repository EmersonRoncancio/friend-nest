import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser';
import { Model } from 'mongoose';
import { User } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';
import { cloudinaryAdapter } from 'src/common/adapters/cloudinary.adapter';
import * as fs from 'fs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('ProductService');
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
  ) {}

  async registerUser(registerDto: RegisterUserDto, filePath: string) {
    try {
      const urlProfile = await cloudinaryAdapter.uploadImage(
        filePath,
        'profiles',
      );

      fs.unlink(filePath, (err) => {
        if (err) {
          throw new Error('No se pudo borrar el archivo');
        }
        this.logger.log('Archivo borrado correctamente');
      });

      const newUser = await this.UserModel.create({
        ...registerDto,
        imageProfile: urlProfile.secure_url,
      });
      return newUser;
    } catch (error) {
      console.log(error);
      this.HandleError(error);
    }
  }

  private HandleError(error: any) {
    this.logger.error(error);
    console.log(error);
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Internal Server Error');
  }
}
