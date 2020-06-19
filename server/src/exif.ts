import * as fs from 'fs';

const orientation = {
  normal: 1,
  upsideDown: 3,
  left: 6,
  right: 8,
}


export interface Metadata {
  rotation: number;
}


/**
 * Parse exif data.
 * Based on https://stackoverflow.com/a/32490603/241025
 * @param path Image file path.
 * @return Exif metadata.
 */
export function parseExif(path: string): Metadata {
  let metadata = {
    rotation: rotationDegrees(orientation.normal),
  };
  try {
    // const view = new DataView(fs.readFileSync(path));
    const view = new DataView(toArrayBuffer(path));
    if (view.getUint16(0, false) === 0xFFD8) {
      let length = view.byteLength, offset = 2;
      while (offset < length) {
        if (view.getUint16(offset+2, false) <= 8) {
          break;
        }
        let marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xFFE1) {
          if (view.getUint32(offset += 2, false) !== 0x45786966) {
            break;
          }
          let little = view.getUint16(offset += 6, false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          let tags = view.getUint16(offset, little);
          offset += 2;
          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + (i * 12), little) === 0x0112) {
              metadata.rotation = rotationDegrees(
                view.getUint16(offset + (i * 12) + 8,
                little)
              );
              break;
            }
          }
        }
        else if ((marker & 0xFF00) !== 0xFF00) {
          break;
        }
        else {
          offset += view.getUint16(offset, false);
        }
      }
    }
  }
  catch (err) {
    console.log('Error parsing image exif: ' + err);
  }
  return metadata;
}

/**
 * Read file as array buffer.
 * Taken from https://stackoverflow.com/a/12101012/241025.
 * @param path Image file path.
 * @return Image as ArrayBuffer.
 */
function toArrayBuffer(path: string): ArrayBuffer {
  const buf = fs.readFileSync(path);
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
  }
  return ab;
}

/**
 * @param exifOrientation Orientation value parsed from exif data.
 * @return Degrees that image should be rotated.
 */
function rotationDegrees(exifOrientation: number): number {
  switch (exifOrientation) {
    case orientation.upsideDown:
      return 180;
    case orientation.left:
      return 90;
    case orientation.right:
      return 270;
    case orientation.normal:
    default:
      return 0;
  }
}
