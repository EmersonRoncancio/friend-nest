import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser';
import { Model } from 'mongoose';
import { User } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';
import { cloudinaryAdapter } from 'src/common/adapters/cloudinary.adapter';

@Injectable()
export class AuthService {
  logger: any;
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

      return urlProfile.secure_url;
      // this.UserModel.create()
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
