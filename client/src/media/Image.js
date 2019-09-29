import React from 'react';
import './Image.css';
import './animation.css';

/**
 * Render and image.
 * @param props.className CSS class name.
 * @param props.image Image URL.
 * @param props.style Optional style overrides.
 */
function Image(props) {
  return (
    <img
      className={props.className}
      src={props.image}
      style={props.style}
      alt={props.image} />
  );
}

export default Image;
