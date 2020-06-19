import { FilePicker } from './file-picker';
import { PathOrder } from './path-order';

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
        imagePaths.push(
          `http://${host}/` +
          imagePath.substring(this.prefixPath.length)
        );
      }
      else {
        console.log("WARNING: imagePath is undefined or empty string");
      }
    };
    console.log(imagePaths);
    return imagePaths;
  }

  private changeSource() {
    this.shown = 0;
    this.basePath = this.pathOrder.getNext();
    this.filePicker = new FilePicker(this.basePath);
  }
}
