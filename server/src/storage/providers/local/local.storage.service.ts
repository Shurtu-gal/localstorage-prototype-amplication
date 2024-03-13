import { FileUpload } from "src/storage/core/types.core";
import { LocalStorageFile } from "./types";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStorageService {
  private readonly basePath: string;

  constructor() {
    this.basePath = 'uploads';
  }

  async uploadFileLocal(file: FileUpload): Promise<LocalStorageFile> {
    const { createReadStream, filename, buffer } = file;
    const path = `./${this.basePath}/${filename}`;

    console.log(file);
    
    //if directory does not exist, create it
    require("fs").mkdirSync(`./${this.basePath}`, { recursive: true });

    if (createReadStream) {
      return new Promise((resolve, reject) =>
        createReadStream()
          .pipe(require("fs").createWriteStream(path))
          .on("finish", () => resolve({
            filename,
            uuid: path,
            mimetype: file.mimetype,
            encoding: file.encoding,
            metadata: {
              size: file.size,
              directory: this.basePath,
            },
          }))
          .on("error", reject)
      );
    } else if (buffer) {
      return new Promise((resolve, reject) =>
        require("fs").writeFile(path, buffer, (err: Error) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              filename,
              uuid: path,
              mimetype: file.mimetype,
              encoding: file.encoding,
              metadata: {
                size: file.size,
                directory: this.basePath,
              },
            });
          }
        }
      ));
    } else {
      throw new Error('Neither createReadStream nor buffer provided');
    }
  }
}