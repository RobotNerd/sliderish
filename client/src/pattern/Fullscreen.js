import React from 'react';
import Image from '../media/Image';
import * as Loader from '../media/Loader';

const duration = '5000'; // milliseconds


/**
 * Display a fullscreen image for a set amount of time.
 * Fit the longest edge of the image to the screen and center
 * it in the other dimension.
 */
export default class Fullscreen extends React.Component {

  /**
   * @param props.config Config loader.
   * @param props.onAnimationEnd Callback when animation is complete.
   */
  constructor(props) {
    super(props);
    // TODO load config from server
    this.state = { imageUrl: '' };
    this.loadImage();
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
        self.onImageLoaded(response);
      });
  }

  onImageLoaded(response) {
    this.setState({
      imageUrl: response.data[0],
    });
    setTimeout(() => {
      this.props.onAnimationEnd();
    }, duration);
  }

  render() {
    return (
      <Image
        className="fit-vertical"
        imageUrl={this.state.imageUrl}
        nameStyle={this.props.nameStyle}
        maxHeight={window.innerHeight}
        maxWidth={window.innerWidth}
      />
    );
  }
}
