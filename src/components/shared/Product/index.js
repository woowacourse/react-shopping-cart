import React from 'react';
import PropTypes from 'prop-types';
import Thumbnail from '../Thumbnail';
import { Container, InformationWrapper, Title, Description, ExtraWrapper } from './style';
import notFoundImage from '../../../assets/images/not-found-product.png';

const Product = ({ thumbnail, information, extra, onClick }) => {
  return (
    <Container>
      <Thumbnail
        image={thumbnail.image}
        notFoundImage={notFoundImage}
        alt={thumbnail.alt}
        size={thumbnail.size}
        onClick={onClick}
      />
      <InformationWrapper>
        <Title onClick={onClick}>{information.title}</Title>
        <Description>{information.description}</Description>
      </InformationWrapper>
      <ExtraWrapper>{extra}</ExtraWrapper>
    </Container>
  );
};

Product.propTypes = {
  thumbnail: PropTypes.shape({
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'x-large']),
  }),

  information: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),

  extra: PropTypes.element,
  onClick: PropTypes.func,
};

export default Product;
