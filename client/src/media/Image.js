import React from 'react';
import './Image.css';
import './animation.css';
import { ExifParser } from './exif.js';
import * as Loader from '../media/Loader';


/**
 * Render and image.
 * @param props.className CSS class name.
 * @param props.imageUrl Image URL.
 * @param props.maxHeight Maximum allowed height of the image.
 * @param props.maxWidth Maximum allowed width of the image.
 * @param props.style Optional style overrides.
 * @param props.zIndex CSS z-index of the image.
 */
export default class Image extends React.Component {

  constructor(props) {
    super(props);
    this.className = `container animation-fade-in`;
    this.rotation = 0;
    this.state = {
      className: 'hidden',
      imageData: null,
      maxHeight: props.maxHeight,
      maxWidth: props.maxWidth,
      rotation: 0,
    };
    this.loadRemoteImage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.imageUrl !== prevProps.imageUrl) {
      this.setState({ className: 'hidden' });
      this.loadRemoteImage();
    }
  }

  loadRemoteImage() {
    let dataUrl = null;
    return Loader.readImageData(this.props.imageUrl)
      .then((imageData) => {
        dataUrl = imageData;
        return ExifParser.createParserFromDataUrl(dataUrl);
      })
      .then((parser) => {
        const state = {
          className: this.className,
          imageData: dataUrl,
          rotation: parser.rotation,
        };
        this.setState(state);
      });
  }

  render() {
    return (
      <span className={`${this.state.className} ${this.props.className}`}>
        <img
          alt=""
          src={this.state.imageData}
          style={{
            maxHeight: this.state.rotation ? this.state.maxWidth : this.state.maxHeight,
            maxWidth: this.state.rotation ? this.state.maxHeight : this.state.maxWidth,
            transform: `rotate(${this.state.rotation}deg)`,
            zIndex: this.props.zIndex,
          }}
        />
        <span className={this.props.nameStyle}>{this.props.imageUrl}</span>
      </span>
    );
  }
}
