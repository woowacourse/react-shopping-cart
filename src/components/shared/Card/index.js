import React from 'react';
import PropTypes from 'prop-types';
import Thumbnail from '../Thumbnail';
import { Container, InformationWrapper, DescriptionWrapper, Title } from './style';

const Card = ({ thumbnail, title, description, onClick }) => {
  return (
    <Container>
      <Thumbnail
        image={thumbnail.image}
        alt={thumbnail.alt}
        size={thumbnail.size ?? 'large'}
        onClick={onClick}
      />
      <InformationWrapper>
        <Title onClick={onClick}>{title}</Title>
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
  onClick: PropTypes.func,
};

export default Card;
