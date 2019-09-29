import React from 'react';
import './Image.css';
import './animation.css';

function Image(props) {
  console.log(props.image);
  return (
    <img
      className={props.className}
      src={props.image}
      alt={props.image} />
  );
}

export default Image;
