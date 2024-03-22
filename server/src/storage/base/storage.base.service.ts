import { FileExtensionEnum, FileUpload, StorageFileBase } from "./storage.types";
import { BadRequestException, StreamableFile } from "@nestjs/common";

export abstract class StorageServiceBase {
  async verifyFile(file: FileUpload, extensions: (FileExtensionEnum | string)[], maxSize?: number): Promise<void> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (extensions.length > 0 && !extensions.some((ext) => file.mimetype.includes(ext))) {
      throw new BadRequestException('Invalid file type');
    }

    if (maxSize) {
      const size = await this.checkFileSize(file, maxSize);
      if (size > maxSize) {
        throw new Error('File size too large');
      }

      file.size = size;
    }
  }

  async checkFileSize(file: FileUpload, maxSize: number): Promise<number> {
    if (file.size && file.size > maxSize) {
      throw new BadRequestException('File size too large');
    } else if (file.size) {
      return file.size;
    }

    let stream: NodeJS.ReadStream;
    let size = 0;

    if (file.createReadStream) {
      stream = file.createReadStream();
    } else {
      throw new Error('Neither createReadStream nor buffer provided');
    }

    await new Promise((resolve, reject) => {
      stream
        .on('data', (chunk) => {
          size += chunk.length;
          if (size > maxSize) {
            stream.destroy();
            reject(new Error('File size too large'));
          }
        })
        .on('end', () => {
          resolve(size);
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    return size;
  }

  abstract uploadFile<T extends StorageFileBase>(file: FileUpload, extensions: (FileExtensionEnum | string)[], maxSize?: number): Promise<T>;
  abstract downloadFile<T extends StorageFileBase>(file: T): Promise<StreamableFile>;
  abstract deleteFile<T extends StorageFileBase>(file: T): Promise<boolean>;
}