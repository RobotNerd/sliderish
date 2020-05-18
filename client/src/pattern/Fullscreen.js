import React from 'react';
import Image from '../media/Image';
import * as Loader from '../media/Loader';

const duration = '5000'; // milliseconds
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
      imageUrl: ['', ''],
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
    Loader.getImageUrls()
      .then((response) => {
        self.onImageUrl(response);
        setTimeout(() => {
          this.toggleBuffer();
        }, swapBufferTimeout);
      });
  }

  onImageUrl(response) {
    const urls = this.state.imageUrl;
    if (this.state.showFront) {
      urls[1] = response.data[0];
    }
    else {
      urls[0] = response.data[0];
    }
    this.setState({
      imageUrl: urls,
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
    return (
      <span>
        <Image
          className={this.state.showFront ? '' : 'hidden' }
          imageUrl={this.state.imageUrl[0]}
          maxHeight={window.innerHeight * maxMargin}
          maxWidth={window.innerWidth * maxMargin}
          nameStyle={this.props.nameStyle}
        />
        <Image
          className={this.state.showFront ? 'hidden' : '' }
          imageUrl={this.state.imageUrl[1]}
          maxHeight={window.innerHeight * maxMargin}
          maxWidth={window.innerWidth * maxMargin}
          nameStyle={this.props.nameStyle}
        />
      </span>
    );
  }
}
