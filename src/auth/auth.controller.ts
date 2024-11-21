import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Get,
  Param,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterUserDto } from './dto/registerUser';
import { LoginUserDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/user.decorator';
import { User } from './entities/auth.entity';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('profile'))
  async registerUsers(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
    @Body() registerDto: RegisterUserDto,
  ) {
    const uploadsDir = path.join(process.cwd(), 'static', 'uploads');

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const typeFile = file.mimetype.split('/')[1];
    const filePath = path.join(uploadsDir, `${uuidv4()}.${typeFile}`);
    fs.writeFileSync(filePath, file.buffer);

    return this.authService.registerUser(registerDto, filePath);
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginUserDto) {
    return this.authService.LoginUser(loginDto);
  }

  @Get('validateToken/:token')
  validateToken(
    @Param('token')
    token: string,
  ) {
    return this.authService.ValidateJWT(token);
  }

  @Get()
  @UseGuards(AuthGuard())
  getUsers(@GetUser() user: User) {
    return {
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      imageProfile: user.imageProfile,
    };
  }
}
