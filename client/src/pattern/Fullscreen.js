import React from 'react';
import { Image } from '../media/Image';
import * as Loader from '../media/Loader';

const duration = '10000'; // milliseconds
const maxMargin = 0.95;  // margin between window border and full screen image
const maxCount = 5;
const swapBufferTimeout = 1200; // milliseconds


/**
 * Get the number of images to display before switching patterns.
 * Pick a number between 1 and maxCount.
 * @return Image count.
 */
function imageCount() {
  return Math.floor(Math.random() * maxCount) + 1;
}


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
   * @param props.refCount Unique value for checking component updates.
   */
  constructor(props) {
    super(props);
    // TODO load config from server
    this.state = {
      showFront: false,
      imageBuffers: [null, null],
    };
    this.toggleBuffer = this.toggleBuffer.bind(this);
    this.nextImage = this.nextImage.bind(this);
  }

  componentDidMount() {
    this.loadImages();
  }

  componentDidUpdate(prevProps) {
    if (this.props.refCount !== prevProps.refCount) {
      this.loadImages();
    }
  }

  loadImages() {
    this.currentImage = 0;
    this.imageList = [];
    const tmp = imageCount();
    Loader.getImageData(tmp)
      .then((response) => {
        response.data.forEach((imageData) => {
          this.imageList.push(imageData);
        });
        this.nextImage();
      });
  }

  nextImage() {
    if (this.currentImage >= this.imageList.length) {
      this.props.onAnimationEnd();
    }
    else {
      this.onImageUrl(this.imageList[this.currentImage]);
      this.currentImage++;
    }
  }

  onImageUrl(response) {
    const imageBuffers = this.state.imageBuffers;
    if (this.state.showFront) {
      imageBuffers[1] = response;
    }
    else {
      imageBuffers[0] = response;
    }
    this.setState({
      imageBuffers: imageBuffers,
    });
    setTimeout(() => {
      this.toggleBuffer();
    }, swapBufferTimeout);
    setTimeout(() => {
      this.nextImage();
    }, duration);
  }

  toggleBuffer() {
    this.setState({
      showFront: !this.state.showFront,
    });
  }

  render() {
    const { imageBuffers, showFront } = this.state;
    const { nameStyle } = this.props;
    return (
      <span>
        {imageBuffers[0] &&
          <Image
            className={showFront ? '' : 'hidden' }
            imageData={imageBuffers[0]}
            maxHeight={window.innerHeight * maxMargin}
            maxWidth={window.innerWidth * maxMargin}
            nameStyle={nameStyle}
          />
        }
        {imageBuffers[1] &&
          <Image
            className={showFront ? 'hidden' : '' }
            imageData={imageBuffers[1]}
            maxHeight={window.innerHeight * maxMargin}
            maxWidth={window.innerWidth * maxMargin}
            nameStyle={nameStyle}
          />
        }
      </span>
    );
  }
}
