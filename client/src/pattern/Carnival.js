import React from 'react';
import Image from '../media/Image';
import * as Loader from '../media/Loader';

const duration = '60000'; // milliseconds
const imageCount = 9;


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
    this.state = { imageUrls: [] };
    this.loadImages();
  }

  /**
   * Animation delay for the image at index.
   * Used to spread images out on the screen.
   * @param {int} index Position of image in the array of all displayed images.
   * @return {int} CSS animation-delay value.
   */
  animationDelay(index) {
    if (index >= 6) {
      return '0s';
    }
    else if (index >= 3) {
      return '10s';
    }
    return '18s';
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
    Loader.getImageUrls(imageCount)
      .then((response) => {
        self.onImagesLoaded(response);
      });
  }

  onImagesLoaded(response) {
    this.setState({
      imageUrls: response.data,
    });
    setTimeout(() => {
      this.props.onAnimationEnd();
    }, duration);
  }

  render() {
    return (
      <span>
        {
          this.state.imageUrls.map ((url, index) =>
            <Image
              animationDelay={this.animationDelay(index)}
              animationDuration={ index % 3 === 1 ? '30s' : '23s'}
              className="animation-side-to-side"
              imageUrl={url}
              key={url}
              maxHeight={index % 3 === 1 ? 100 : 150}
              nameStyle={this.props.nameStyle}
              top={this.verticalPosition(index)}
              zIndex={index % 3 === 1 ? 0 : 1}
            />
          )
        }
      </span>
    );
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
        return window.innerHeight * 0.40;
      case 2:
      default:
        return window.innerHeight * 0.70;
    }
  }
}
