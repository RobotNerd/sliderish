import React from 'react';
import './Image.css';
import './animation.css';
import { Image as ImageLoad } from "load-image-react";


/**
 * Render and image.
 * @param props.className CSS class name.
 * @param props.image Image URL.
 * @param props.style Optional style overrides.
 * @param props.nameStyle Class name for displaying image paths.
 */
function Image(props) {
  return (
    <span className="container">
      <ImageLoad
        src={props.image}
        loadOptions={{
          maxWidth: window.innerWidth,
          maxHeight: window.innerHeight,
        }}
      />
      <span className={props.nameStyle}>{props.image}</span>
    </span>
  );
}

export default Image;
