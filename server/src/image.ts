import { FilePicker } from './file-picker';
import { PathOrder } from './path-order';
import * as exif from './exif';

const CYCLE_LIMIT = 10;


export class ImagePicker {

  filePicker!: FilePicker;
  pathOrder!: PathOrder;
  basePath!: string;     // TODO make specific to client making the request
  shown!: number;        // TODO make specific to client making the request

  constructor(rootPaths: string[], private prefixPath: string) {
    this.pathOrder = new PathOrder(rootPaths);
    this.changeSource();
  }

  /** Get images to be served to client. */
  getImages(host: string, count: number = 1): string[] {
    if (this.shown > CYCLE_LIMIT) {
      this.changeSource();
    }
    this.shown += count;
    const imagePaths = [];
    for (let imagePath of this.filePicker.getNext(count)) {
      if (imagePath) {
        const metadata = exif.parseExif(imagePath);
        console.log(`${metadata.rotation}: ${imagePath}`);
        imagePaths.push(
          `http://${host}/` +
          imagePath.substring(this.prefixPath.length)
        );
      }
      else {
        console.log("WARNING: imagePath is undefined or empty string");
      }
    };
    return imagePaths;
  }

  private changeSource() {
    this.shown = 0;
    this.basePath = this.pathOrder.getNext();
    this.filePicker = new FilePicker(this.basePath);
  }
}
