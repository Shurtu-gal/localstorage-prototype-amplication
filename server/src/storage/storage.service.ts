import { Injectable } from '@nestjs/common';
import { StorageServiceCore } from './core/storage.core.service';
import { LocalStorageService } from './providers/local/local.storage.service';

@Injectable()
export class StorageService extends StorageServiceCore {
  constructor(protected readonly localStorageProvider: LocalStorageService) {
    super(localStorageProvider);
  }
}
