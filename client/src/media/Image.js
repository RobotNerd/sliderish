import React from 'react';
import './Image.css';
import './animation.css';
import { Image as ImageLoad } from "load-image-react";


/**
 * Render and image.
 * @param props.className CSS class name.
 * @param props.image Image URL.
 * @param props.style Optional style overrides.
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
      <span className="image-name">{props.image}</span>
    </span>
  );
}

export default Image;
