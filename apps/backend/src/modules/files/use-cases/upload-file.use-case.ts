import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IUseCase } from 'src/modules/common/utils/interfaces/use-case';
import { toKebabCase } from 'src/modules/common/utils/text-transformer';
import { FileUploadError } from 'src/services/aws/errors/file-upload.error';
import { S3Service } from 'src/services/aws/s3.service';

export class UploadFileCommand {
  file: Pick<Express.Multer.File, 'buffer' | 'originalname' | 'mimetype'>;

  constructor(params: UploadFileCommand) {
    Object.assign(this, params);
  }
}

@Injectable()
export class UploadFileUseCase implements IUseCase<UploadFileCommand, string> {
  private readonly _logger = new Logger(UploadFileUseCase.name);

  constructor(private readonly s3Service: S3Service) {}

  async execute(command: UploadFileCommand): Promise<string> {
    const { file } = command;

    try {
      const fileName = toKebabCase(file.originalname);

      return this.s3Service.uploadFile(fileName, file.buffer, file.mimetype);
    } catch (error) {
      this._logger.error(
        `Error uploading file ${file.originalname} to S3: ${error}`,
      );

      throw new InternalServerErrorException((<FileUploadError>error).message);
    }
  }
}
