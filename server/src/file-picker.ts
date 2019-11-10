import * as fs from 'fs';
import { extensions } from './constants';
import { Util } from './util';


/** Choose file from a directory to serve to the client. */
export class FilePicker {
  index: number;
  mediaPaths: string[];

  constructor(path: string) {
    this.index = 0;
    this.mediaPaths = FilePicker.getMedia(path);
    Util.sortRandom(this.mediaPaths);
  }

  /** Create random ordered list of paths to media files in the directory. */
  private static getMedia(path: string): string[] {
    const paths: string[] = [];
    if (Util.isDirectory(path)) {
      const files: string[] = fs.readdirSync(path);
      for (let file of files) {
        for (let ext of extensions) {
          if (file.includes(ext)) {
            paths.push(`${path}/${file}`);
          }
        }
      }
    }
    return paths;
  }

  /** Get next media file path. */
  getNext(): string {
    if (this.index >= this.mediaPaths.length) {
      this.index = 0;
    }
    else {
      this.index++;
    }
    return this.mediaPaths[this.index];
  }
}
