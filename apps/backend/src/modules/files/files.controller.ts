import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  UploadFileCommand,
  UploadFileUseCase,
} from './use-cases/upload-file.use-case';

@Controller('files')
export class FilesController {
  constructor(private readonly _uploadFileUseCase: UploadFileUseCase) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile()
    file: Pick<Express.Multer.File, 'buffer' | 'originalname' | 'mimetype'>,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const command = new UploadFileCommand({ file });
    return await this._uploadFileUseCase.execute(command);
  }
}
