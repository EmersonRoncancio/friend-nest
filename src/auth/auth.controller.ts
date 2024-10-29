import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileName } from 'src/common/helpers/fileName.helper';
import { plainToClass, plainToInstance } from 'class-transformer';
import { RegisterUserDto } from './dto/registerUser';
import { validateOrReject } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('profile', {
      storage: diskStorage({
        destination: './static/uploads',
        filename: FileName,
      }),
    }),
  )
  async registerUsers(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
    @Body() registerDto: any,
  ) {
    const dto = plainToInstance(RegisterUserDto, registerDto);

    try {
      await validateOrReject(dto); // Valida el DTO usando class-validator
    } catch (errors) {
      const Expetion = {
        message: errors[0].constraints,
        error: 'Bad Request',
        status: 400,
      };
      throw new BadRequestException(Expetion);
    }

    return this.authService.registerUser(dto, file.path);
  }
}
