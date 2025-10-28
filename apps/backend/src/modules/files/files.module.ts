import { Module } from '@nestjs/common';
import { S3Service } from '../../services/aws/s3.service';
import { FilesController } from './files.controller';
import { UploadFileUseCase } from './use-cases/upload-file.use-case';

@Module({
  controllers: [FilesController],
  providers: [S3Service, UploadFileUseCase],
})
export class FilesModule {}
