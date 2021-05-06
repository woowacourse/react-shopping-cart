import React from 'react';
import PropTypes from 'prop-types';
import Thumbnail from '../Thumbnail';
import { Container, InformationWrapper, DescriptionWrapper, Title } from './style';

const Card = ({ thumbnail, title, description }) => {
  return (
    <Container>
      <Thumbnail image={thumbnail.image} alt={thumbnail.alt} size={thumbnail.size ?? 'large'} />
      <InformationWrapper>
        <Title>{title}</Title>
        <DescriptionWrapper>{description}</DescriptionWrapper>
      </InformationWrapper>
    </Container>
  );
};

Card.propTypes = {
  thumbnail: PropTypes.shape({
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    size: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  description: PropTypes.element,
};

export default Card;
