import React from 'react';
import './Image.css';
import './animation.css';
import { ExifParser } from './exif.js';
import * as Loader from '../media/Loader';


/**
 * Load and store image data from remote server.
 * This data is used by ImageRender class to display the image.
 */
export class ImageData {
  
  /**
   * @param {string} url Image to load.
   */
  constructor(url) {
    this.imageData = null;
    this.rotation = 0;
    this.url = url;
  }

  /**
   * Load image from server and determine rotation based on metadata.
   */
  async load() {
    return Loader.readImageData(this.url)
      .then((data) => {
        this.imageData = data;
        return ExifParser.createParserFromDataUrl(this.imageData);
      })
      .then((parser) => {
        this.rotation = parser.rotation;
      });
  }
}


/**
 * Render and image.
 * @param props.animationDelay Delay for starting css animation.
 * @param props.animationDuration Speed of animation.
 * @param props.className CSS class name.
 * @param props.imageData Instance of the ImageData class.
 * @param props.maxHeight Maximum allowed height of the image.
 * @param props.maxWidth Maximum allowed width of the image.
 * @param props.style Optional style overrides.
 * @param props.top Top position of image.
 * @param props.zIndex CSS z-index of the image.
 */
export class ImageDisplay extends React.Component {

  render() {
    const { rotation, imageData, imageUrl } = this.props.imageData;
    const {
      animationDelay,
      animationDuration,
      className,
      maxWidth,
      maxHeight,
      nameStyle,
      top,
      zIndex
    } = this.props;
    return (
      <span
        className={className}
        style={{
          animationDelay: animationDelay,
          animationDuration: animationDuration,
          top: top,
        }}
      >
        <img
          alt=""
          src={imageData}
          className={'animation-fade-in'}
          style={{
            maxHeight: rotation ? maxWidth : maxHeight,
            maxWidth: rotation ? maxHeight : maxWidth,
            transform: `rotate(${rotation}deg)`,
            zIndex: zIndex,
          }}
        />
        <span className={nameStyle}>{imageUrl}</span>
      </span>
    );
  }
}
