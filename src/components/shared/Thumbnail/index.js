import React from 'react';
import { Container } from './style';

/*
Default: medium
- small 120px * 120px
- medium 144px * 144px
- large 282px * 282px
- x-large 570px * 570px
*/

const Thumbnail = ({ image, alt, size = 'middle' }) => {
  return <Container src={image} alt={alt} size={size}></Container>;
};

export default Thumbnail;
