import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/entities/auth.entity';
import { CreatePublicationDto } from './dto/create-publication.dto';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post('createPublication')
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard())
  async createPublication(
    @Body() createPostDto: CreatePublicationDto,
    @GetUser() user: User,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
        fileIsRequired: false,
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    const uploadsDir = path.join(process.cwd(), 'static', 'uploads');
    let filesPaths: string[] = [];
    if (files.length > 0) {
      filesPaths = files.map((file) => {
        const typeFile = file.mimetype.split('/')[1];
        const filePath = path.join(uploadsDir, `${uuidv4()}.${typeFile}`);
        fs.writeFileSync(filePath, file.buffer);
        return filePath;
      });
    }

    return this.publicationsService.createPublication(
      createPostDto,
      user.id,
      filesPaths,
    );
  }
}
