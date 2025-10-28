import { PutObjectCommand } from '@aws-sdk/client-s3';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { s3 } from './s3-client';

@Injectable()
export class S3Service {
  private readonly _logger: Logger = new Logger(S3Service.name);

  async uploadFile(
    key: string,
    body: Buffer | Uint8Array | string,
    contentType?: string,
  ) {
    const bucket = process.env.AWS_BUCKET_NAME;
    // const region = process.env.AWS_REGION;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    });

    try {
      await s3.send(command);
    } catch (error) {
      this._logger.error(error);

      if (error instanceof Error) {
        throw new BadRequestException(
          `Failed to upload file: ${error.message}`,
        );
      }
      throw new BadRequestException(
        'Unknown error while trying to upload file!',
      );
    }

    return key;

    // return { url: `https://${bucket}.s3.${region}.amazonaws.com/${key}` };
  }
}
