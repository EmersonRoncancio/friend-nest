import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileName } from 'src/common/helpers/fileName.helper';
import { plainToInstance } from 'class-transformer';
import { RegisterUserDto } from './dto/registerUser';
import { validateOrReject } from 'class-validator';
import { fileFilter } from 'src/common/helpers/fileFilter.helper';
import { LoginUserDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/user.decorator';
import { User } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(
    FileInterceptor('profile', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/uploads',
        filename: FileName,
      }),
    }),
  )
  async registerUsers(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() registerDto: any,
  ) {
    const dto = plainToInstance(RegisterUserDto, registerDto);

    if (!file) throw new BadRequestException('imagen no recivida o invalida');

    try {
      await validateOrReject(dto); // Valida el DTO usando class-validator
    } catch (errors) {
      const Expetion = {
        message: errors.map((err: any) => {
          const firstKey = Object.keys(err.constraints)[0];
          return err.constraints[firstKey];
        }),
        error: 'Bad Request',
        status: 400,
      };
      throw new BadRequestException(Expetion);
    }

    return this.authService.registerUser(dto, file.path);
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginUserDto) {
    return this.authService.LoginUser(loginDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  getUsers(@GetUser('hola') user: User) {
    return user;
  }
}
