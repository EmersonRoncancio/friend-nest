import { Controller, Post, UploadedFiles } from '@nestjs/common';
import { PublicationsService } from './publications.service';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post('createPublication')
  async createPublication(
    // @Body() createPostDto: any,
    // @GetUser() user: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
  }
}
