import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser';
import { Model } from 'mongoose';
import { User } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';
import { cloudinaryAdapter } from 'src/common/adapters/cloudinary.adapter';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { LoginUserDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('ProductService');
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerDto: RegisterUserDto, filePath: string) {
    try {
      const { password, ...newUserDto } = registerDto;

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

      const salt = bcrypt.genSaltSync();

      const newUser = await this.UserModel.create({
        ...newUserDto,
        password: bcrypt.hashSync(password, salt),
        imageProfile: urlProfile.secure_url,
      });
      return newUser;
    } catch (error) {
      this.HandleError(error);
    }
  }

  private HandleError(error: any) {
    this.logger.error(error);
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Internal Server Error');
  }

  async LoginUser(loginDto: LoginUserDto) {
    const { email, password } = loginDto;

    const validateEmail = await this.UserModel.findOne({ email });
    if (!validateEmail)
      throw new UnauthorizedException('Error al iniciar sesión');

    const validatePassword = bcrypt.compareSync(
      password,
      validateEmail.password,
    );
    if (!validatePassword)
      throw new UnauthorizedException('Error al iniciar sesión');

    const payload = { userId: validateEmail.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
