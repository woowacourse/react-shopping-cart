import React from 'react';
import PropTypes from 'prop-types';
import { Container, Image } from './style';
import noImage from '../../../assets/images/no_image.svg';

const Thumbnail = ({ image = noImage, alt, size, onClick }) => {
  const setErrorImage = event => {
    event.currentTarget.src = noImage;
  };

  return (
    <div>
      <Container size={size}>
        <Image src={image} alt={alt} onClick={onClick} onError={setErrorImage} />
      </Container>
    </div>
  );
};

Thumbnail.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'x-large']),
  onClick: PropTypes.func,
};

export default Thumbnail;
