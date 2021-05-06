import React from 'react';
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

export default Card;
