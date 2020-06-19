import React from 'react';
import './Image.css';
import './animation.css';


/**
 * Render and image.
 * @param props.animationDelay Delay for starting css animation.
 * @param props.animationDuration Speed of animation.
 * @param props.className CSS class name.
 * @param props.imageData Image metadata.
 * @param props.maxHeight Maximum allowed height of the image.
 * @param props.maxWidth Maximum allowed width of the image.
 * @param props.nameStyle Style used for displaying image names.
 * @param props.style Optional style overrides.
 * @param props.top Top position of image.
 * @param props.zIndex CSS z-index of the image.
 */
export class Image extends React.Component {

  render() {
    const { url } = this.props.imageData;
    const { rotation } = this.props.imageData.metadata;
    const {
      animationDelay,
      animationDuration,
      className,
      maxWidth,
      maxHeight,
      nameStyle,
      top,
      zIndex
    } = this.props;
    return (
      <span
        className={className}
        style={{
          animationDelay: animationDelay,
          animationDuration: animationDuration,
          top: top,
        }}
      >
        <img
          alt=""
          src={url}
          className={'animation-fade-in'}
          style={{
            maxHeight: rotation ? maxWidth : maxHeight,
            maxWidth: rotation ? maxHeight : maxWidth,
            transform: `rotate(${rotation}deg)`,
            zIndex: zIndex,
          }}
        />
        <span className={nameStyle}>{url}</span>
      </span>
    );
  }
}
