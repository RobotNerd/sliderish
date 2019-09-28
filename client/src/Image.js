import React from 'react';
import './Image.css';

function Image(props) {
  return (
    <img className={props.className} src={props.image} alt='pic' />
  );
}

export default Image;
