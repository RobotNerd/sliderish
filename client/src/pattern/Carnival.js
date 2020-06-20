import React from 'react';
import { Image } from '../media/Image';
import * as Loader from '../media/Loader';

const duration = '60000'; // milliseconds
const imageCount = 3;


/**
 * Display a set of images on the screen at different z-levels.
 * The images pan across the screen. Panning speed and image
 * dimensions are dependent on z-index to provide a 3D effect.
 */
export default class Carnival extends React.Component {

  /**
   * @param props.config Config loader.
   * @param props.onAnimationEnd Callback when animation is complete.
   */
  constructor(props) {
    super(props);
    // TODO load config from server
    this.state = { images: [] };
  }

  /**
   * Animation delay for the image at index.
   * Used to spread images out on the screen.
   * @param {int} index Position of image in the array of all displayed images.
   * @return {int} CSS animation-delay value.
   */
  animationDelay(index) {
    const offset = Math.floor((-0.5 + Math.random()) * 2);
    switch(index) {
      case 0:
        return `${offset}s`;
      case 1:
        return `${offset - 10}s`;
      case 2:
      default:
        return `${offset - 20}s`;
    }
  }

  componentDidMount() {
    this.loadImages();
  }

  componentDidUpdate(prevProps) {
    if (this.props.refCount !== prevProps.refCount) {
      this.loadImages();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadImages() {
    const self = this;
    const images = [];
    Loader.getImageData(imageCount)
      .then((response) => {
        response.data.forEach((imageData) => {
          images.push(imageData);
        });
        self.setState({ images: images });
        setTimeout(() => {
          self.props.onAnimationEnd();
        }, duration);
      });
  }

  render() {
    return (
      <span>
        {
          this.state.images.map((imageData, index) =>
            <Image
              animationDelay={this.animationDelay(index)}
              animationDuration="30s"
              className="animation-side-to-side"
              imageData={imageData}
              key={imageData.url}
              maxHeight={this.imageHeight(index)}
              maxWidth={this.imageWidth()}
              nameStyle={this.props.nameStyle}
              top={this.verticalPosition(index)}
            />
          )
        }
      </span>
    );
  }

  imageHeight(index) {
    const big = Math.floor(window.innerHeight);
    const small = Math.floor(window.innerHeight / 3);
    return (1 + Math.random()) * (index % 3 === 1 ? small : big);
  }

  imageWidth() {
    return Math.floor(window.innerWidth / 4);
  }

  /**
   * @param {int} index Position of image in the array of all displayed images.
   * @return {int} CSS top value for the image.
   */
  verticalPosition(index) {
    switch (index % 3) {
      case 0:
        return window.innerHeight * 0.05;
      case 1:
        return window.innerHeight * 0.3;
      case 2:
      default:
        return window.innerHeight * 0.45;
    }
  }
}
