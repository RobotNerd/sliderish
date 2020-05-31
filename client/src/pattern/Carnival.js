import React from 'react';
import { ImageData, ImageDisplay } from '../media/Image';
import * as Loader from '../media/Loader';

const duration = '60000'; // milliseconds
const imageCount = 9;
const speed = 30;


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
    this.loadImages();
  }

  /**
   * Animation delay for the image at index.
   * Used to spread images out on the screen.
   * @param {int} index Position of image in the array of all displayed images.
   * @return {int} CSS animation-delay value.
   */
  animationDelay(index) {
    const step = Math.floor(speed / 3);
    const offset = Math.floor((-0.5 + Math.random()) * 2);
    if (index >= 6) {
      return `${offset}s`;
    }
    else if (index >= 3) {
      return `${-step + offset}s`;
    }
    return `${-step*2 + offset}s`;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.loadImages();
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadImages() {
    const self = this;
    const images = [];
    const requests = [];
    Loader.getImageUrls(imageCount)
      .then((response) => {
        response.data.forEach((url) => {
          const image = new ImageData(url);
          images.push(image);
          requests.push(image.load());
        });
        return Promise.all(requests);
      })
      .then(() => {
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
            <ImageDisplay
              animationDelay={this.animationDelay(index)}
              // animationDuration={index % 3 === 1 ? `${slow}s` : `${fast}s` }
              animationDuration={`${speed}s`}
              className="animation-side-to-side"
              imageData={imageData}
              key={imageData.url}
              maxHeight={this.imageHeight(index)}
              maxWidth={this.imageWidth()}
              nameStyle={this.props.nameStyle}
              top={this.verticalPosition(index)}
              zIndex={index % 3 === 1 ? 0 : 1}
            />
          )
        }
      </span>
    );
  }

  imageHeight(index) {
    const big = Math.floor(window.innerHeight / 5);
    const small = Math.floor(window.innerHeight / 12);
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
    const offset = (Math.random() - 0.5) * (window.innerHeight * 0.08);
    switch (index % 3) {
      case 0:
        return window.innerHeight * 0.05 + offset;
      case 1:
        return window.innerHeight * 0.50 + offset;
      case 2:
      default:
        return window.innerHeight * 0.70 + offset;
    }
  }
}
