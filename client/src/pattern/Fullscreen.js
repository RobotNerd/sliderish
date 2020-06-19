import React from 'react';
import { Image } from '../media/Image';
import * as Loader from '../media/Loader';

const duration = '10000'; // milliseconds
const maxMargin = 0.95;  // margin between window border and full screen image
const swapBufferTimeout = 1200; // milliseconds


/**
 * Display a fullscreen image for a set amount of time.
 * Fit the longest edge of the image to the screen and center
 * it in the other dimension.
 */
export default class Fullscreen extends React.Component {

  /**
   * Front/back buffers
   * Two Image components are rendered following the concept of front and
   * back buffers. Only one is shown at a time. When a new image is received,
   * it is rendered using the hidden image buffer. This prevents glitching.
   *
   * A timeout is used when switching the visibility of these images.
   * This is a workaround. Without it, the rotation is applied before the
   * image is displayed. This appears to be the behavior of the image
   * element's onload handler.
   */

  /**
   * @param props.config Config loader.
   * @param props.onAnimationEnd Callback when animation is complete.
   */
  constructor(props) {
    super(props);
    // TODO load config from server
    this.state = {
      showFront: false,
      imageData: [null, null],
    };
    this.loadImage();
    this.toggleBuffer = this.toggleBuffer.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.loadImage();
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadImage() {
    const self = this;
    Loader.getImageData()
      .then((response) => {
        self.onImageUrl(response);
        setTimeout(() => {
          this.toggleBuffer();
        }, swapBufferTimeout);
      });
  }

  onImageUrl(response) {
    const images = this.state.imageData;
    if (this.state.showFront) {
      images[1] = response.data[0];
    }
    else {
      images[0] = response.data[0];
    }
    this.setState({
      imageData: images,
    });
    setTimeout(() => {
      this.props.onAnimationEnd();
    }, duration);
  }

  toggleBuffer() {
    this.setState({
      showFront: !this.state.showFront,
    });
  }

  render() {
    const { imageData, showFront } = this.state;
    const { nameStyle } = this.props;
    return (
      <span>
        {imageData[0] &&
          <Image
            className={showFront ? '' : 'hidden' }
            imageData={imageData[0]}
            maxHeight={window.innerHeight * maxMargin}
            maxWidth={window.innerWidth * maxMargin}
            nameStyle={nameStyle}
          />
        }
        {imageData[1] &&
          <Image
            className={showFront ? 'hidden' : '' }
            imageData={imageData[1]}
            maxHeight={window.innerHeight * maxMargin}
            maxWidth={window.innerWidth * maxMargin}
            nameStyle={nameStyle}
          />
        }
      </span>
    );
  }
}
