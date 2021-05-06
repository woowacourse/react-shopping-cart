import React from 'react';
import PropTypes from 'prop-types';
import Thumbnail from '../Thumbnail';
import { Container, InformationWrapper, Title, Description, ExtraWrapper } from './style';

const Product = ({ thumbnail, information, extra }) => {
  return (
    <Container>
      <Thumbnail image={thumbnail.image} alt={thumbnail.alt} size={thumbnail.size} />
      <InformationWrapper>
        <Title>{information.title}</Title>
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
    size: PropTypes.string,
  }),

  information: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),

  extra: PropTypes.element,
};

export default Product;
