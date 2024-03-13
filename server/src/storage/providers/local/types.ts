import { StorageFileCore } from "src/storage/core/types.core";

export interface LocalStorageFile extends StorageFileCore {
  metadata?: {
    size?: number;
    directory?: string;
  }
}