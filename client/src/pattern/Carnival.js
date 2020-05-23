import React from 'react';
import Image from '../media/Image';
import * as Loader from '../media/Loader';

const duration = '20000'; // milliseconds
const imageCount = 10;


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
              className="animation-side-to-side"
              imageUrl={url}
              key={url}
              maxHeight={100 + index * 50}
              maxWidth={100 + index * 50}
              nameStyle={this.props.nameStyle}
              zIndex={index}
            />
          )
        }
      </span>
    );
  }
}
