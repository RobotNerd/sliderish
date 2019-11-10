import * as fs from 'fs';
import { Util } from './util';


/** Manage paths where media are stored. */
export class PathOrder {
  index: number;
  orderedPaths: string[];

  constructor(
    rootPaths: string[]
  ) {
    this.index = 0;
    this.orderedPaths = this.parseTree(rootPaths);
    this.reorder();
  }

  /** Get path to next folder for serving images. */
  getNext() {
    (this.index >= this.orderedPaths.length) ? this.reorder() : this.index++;
    return this.orderedPaths[this.index];
  }

  /** Create recursive list of all directories. */
  private parseTree(rawPaths: string[], root: string = ''): string[] {
    let paths: string[] = [];
    for (let rawPath of rawPaths) {
      const fullPath = root != '' ? `${root}/${rawPath}` : rawPath;
      if (Util.isDirectory(fullPath)) {
        if (Util.containsMedia(fullPath)) {
          paths.push(fullPath);
        }
        const files: string[] = fs.readdirSync(fullPath);
        paths = [...paths, ...this.parseTree(files, fullPath)];
      }
    }
    return paths;
  }

  /** Reorder the parsed directory paths and reset visited status. */
  reorder() {
    this.index = 0;
    Util.sortRandom(this.orderedPaths);
  }
}
