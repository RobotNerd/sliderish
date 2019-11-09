import * as fs from 'fs';
import { extensions } from './constants';


export class Util {

  static containsMedia(path: string): boolean {
    if (Util.isDirectory(path)) {
      const files: string[] = fs.readdirSync(path);
      for (let file of files) {
        for (let ext of extensions) {
          if (file.includes(ext)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  static isDirectory(path: string): boolean {
    if (!fs.existsSync(path)) {
      return false;
    }
    const stats = fs.statSync(path);
    if (!stats.isDirectory()) {
      return false;
    }
    return true;
  }

  static sortRandom(arr: any[]) {
    arr.sort(() => Math.random() - 0.5);
  }
}
