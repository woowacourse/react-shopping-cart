import React from 'react';
import PropTypes from 'prop-types';
import { Container, Wrapper, Image } from './style';

const Thumbnail = ({ image, alt, size, onClick }) => {
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
  size: PropTypes.oneOf(['small', 'medium', 'large', 'x-large']),
  onClick: PropTypes.func,
};

export default Thumbnail;
