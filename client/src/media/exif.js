const orientation = {
  normal: 1,
  upsideDown: 3,
  left: 6,
  right: 8,
}


export class ExifParser {

  /**
   * @param imageBlob Image encoded as an arrayBuffer.
   */
  constructor(imageBlob) {
    this.view = null;
    this.rotation = 0;  // Rotation angle to use in degrees.
    this.view = new DataView(imageBlob);
    this.parseExif();
  }

  /**
   * Instantiate ExifParser using an image encoded as a data url.
   * @param dataUrl Image encoded as a data url.
   * @return ExifParser object.
   */
  static async createParserFromDataUrl(dataUrl) {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const buffer = await blob.arrayBuffer();
    return new ExifParser(buffer);
  }

  /**
   * Parse exif data.
   * Based on https://stackoverflow.com/a/32490603/241025
   */
  parseExif() {
    this.setRotation(orientation.normal);
    if (this.view.getUint16(0, false) === 0xFFD8) {
      let length = this.view.byteLength, offset = 2;
      while (offset < length) {
        if (this.view.getUint16(offset+2, false) <= 8) {
          break;
        }
        let marker = this.view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xFFE1) {
          if (this.view.getUint32(offset += 2, false) !== 0x45786966) {
            break;
          }
          let little = this.view.getUint16(offset += 6, false) === 0x4949;
          offset += this.view.getUint32(offset + 4, little);
          let tags = this.view.getUint16(offset, little);
          offset += 2;
          for (let i = 0; i < tags; i++) {
            if (this.view.getUint16(offset + (i * 12), little) === 0x0112) {
              this.setRotation(this.view.getUint16(offset + (i * 12) + 8, little));
              break;
            }
          }
        }
        else if ((marker & 0xFF00) !== 0xFF00) {
          break;
        }
        else {
          offset += this.view.getUint16(offset, false);
        }
      }
    }
  }

  /**
   * @param exifOrientation Orientation value parsed from exif data.
   */
  setRotation(exifOrientation) {
    switch (exifOrientation) {
      case orientation.upsideDown:
        this.rotation = 180;
        break;
      case orientation.left:
        this.rotation = 90;
        break;
      case orientation.right:
        this.rotation = 270;
        break;
      case orientation.normal:
      default:
        this.rotation = 0;
        break;
    }
  }
}
