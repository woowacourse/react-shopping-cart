import React from 'react';
import PropTypes from 'prop-types';
import Thumbnail from '../Thumbnail';
import { Container, InformationWrapper, DescriptionWrapper, Title } from './style';

const Card = ({ thumbnail, title, description, onClick }) => {
  return (
    <Container>
      <Thumbnail
        image={thumbnail.imageUrl}
        alt={thumbnail.alt}
        notFoundImage={thumbnail.notFoundImage}
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
    imageUrl: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'x-large']),
  }),
  title: PropTypes.string.isRequired,
  description: PropTypes.element,
  onClick: PropTypes.func,
};

export default Card;
