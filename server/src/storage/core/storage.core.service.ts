import { FileExtensionEnum, FileUpload, StorageFileCore } from "./types.core";
import { ProvidersEnum } from "../providers";
import { LocalStorageService } from "../providers/local/local.storage.service";
import { BadRequestException, StreamableFile } from "@nestjs/common";

export interface ProviderService {
  uploadFile(file: FileUpload): Promise<StorageFileCore>;
  downloadFile(file: StorageFileCore): Promise<StreamableFile>;
  deleteFile(file: StorageFileCore): Promise<boolean>;
}

export class StorageServiceCore {
  constructor(
    protected readonly localStorageProvider: LocalStorageService,
  ) {}

  async uploadFile(file: FileUpload, provider: ProvidersEnum, extensions: (FileExtensionEnum | string)[], maxSize?: number): Promise<StorageFileCore> {
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

    try {
      switch (provider) {
        case ProvidersEnum.LOCAL:
          return this.localStorageProvider.uploadFile(file);
        default:
          throw new Error('Provider not implemented');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to upload file');
    }
  }

  async downloadFile(file: StorageFileCore, provider: ProvidersEnum): Promise<StreamableFile> {
    switch (provider) {
      case ProvidersEnum.LOCAL:
        return this.localStorageProvider.downloadFile(file);
      default:
        throw new Error('Provider not implemented');
    }
  }

  async deleteFile(file: StorageFileCore, provider: ProvidersEnum): Promise<boolean> {
    switch (provider) {
      case ProvidersEnum.LOCAL:
        return this.localStorageProvider.deleteFile(file);
      default:
        throw new Error('Provider not implemented');
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
}