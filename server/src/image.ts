import { FilePicker } from './file-picker';
import { PathOrder } from './path-order';
import * as exif from './exif';


export interface Image {
  metadata: exif.Metadata;
  url: string;
}


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
  getImages(host: string, count: number = 1): Image[] {
    this.shown += count;
    const imagePaths: Image[] = [];
    for (let imagePath of this.filePicker.getNext(count)) {
      if (imagePath) {
        const metadata = exif.parseExif(imagePath);
        console.log(`${metadata.rotation}: ${imagePath}`);
        imagePaths.push({
          metadata,
          url: `http://${host}/` +
               imagePath.substring(this.prefixPath.length)
        });
      }
      else {
        console.log("WARNING: imagePath is undefined or empty string");
      }
    };
    this.changeSource();
    return imagePaths;
  }

  private changeSource() {
    this.shown = 0;
    this.basePath = this.pathOrder.getNext();
    this.filePicker = new FilePicker(this.basePath);
  }
}
