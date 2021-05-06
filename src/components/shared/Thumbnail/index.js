import React from 'react';
import PropTypes from 'prop-types';
import { Container, Wrapper, Image } from './style';

/*
Default: medium
- small 120px * 120px
- medium 144px * 144px
- large 282px * 282px
- x-large 570px * 570px
*/

const Thumbnail = ({ image, alt, size = 'middle', onClick }) => {
  return (
    <Container onClick={onClick}>
      <Wrapper size={size}>
        <Image src={image} alt={alt} />
      </Wrapper>
    </Container>
  );
};

Thumbnail.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string,
  onClick: PropTypes.func,
};

export default Thumbnail;
