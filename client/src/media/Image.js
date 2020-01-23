import React from 'react';
import './Image.css';
import './animation.css';
import { ExifParser } from './exif.js';
import * as Loader from '../media/Loader';


/**
 * Render and image.
 * @param props.className CSS class name.
 * @param props.image Image URL.
 * @param props.style Optional style overrides.
 * @param props.nameStyle Class name for displaying image paths.
 */
export default class Image extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imageData: null,
      maxHeight: props.maxHeight,
      maxWidth: props.maxWidth,
      rotation: 0,
    };
    this.reader = new FileReader();
    this.reader.addEventListener('load', this.onImageLoad);
  }

  componentDidUpdate(prevProps) {
    if (this.props.imageUrl !== prevProps.imageUrl) {
      let dataUrl = null;
      return Loader.readImageData(this.props.imageUrl)
        .then((imageData) => {
          dataUrl = imageData;
          return ExifParser.createParserFromDataUrl(dataUrl);
        })
        .then((parser) => {
          const state = {
            imageData: dataUrl,
            rotation: parser.rotation,
          };
          this.setState(state);
        });
    }
  }

  render() {
    return (
      <span className = "container">
        <img
          alt={this.props.image}
          src={this.state.imageData}
          style={{
            maxHeight: this.state.maxHeight,
            maxWidth: this.state.maxWidth,
            transform: `rotate(${this.state.rotation}deg)`,
          }}
        />
        <span className={this.props.nameStyle}>{this.props.image}</span>
      </span>
    );
  }
}
