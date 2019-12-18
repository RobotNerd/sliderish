import React from 'react';
import './Image.css';
import './animation.css';
import * as Loader from '../media/Loader';


/**
 * Render and image.
 * @param props.className CSS class name.
 * @param props.image Image URL.
 * @param props.style Optional style overrides.
 * @param props.nameStyle Class name for displaying image paths.
 */
class Image extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imageData: null,
    };
    this.reader = new FileReader();
    this.reader.addEventListener('load', this.onImageLoad);
  }

  componentDidUpdate (prevProps) {
    if (this.props.imageUrl !== prevProps.imageUrl) {
      return Loader.readImageData(this.props.imageUrl)
        .then((imageData) => {
          this.setState({ imageData: imageData });
        });
    }
  }

  render() {
    return (
      <span className="container">
        <img src={this.state.imageData} alt={this.props.image} />
        <span className={this.props.nameStyle}>{this.props.image}</span>
      </span>
    );
  }
}

export default Image;
