import React from 'react';
import { Container, Image, InformationWrapper, DescriptionWrapper, Title } from './style';

const Card = ({ image, title, description }) => {
  return (
    <Container>
      <Image src={image} alt={title} />
      <InformationWrapper>
        <Title>{title}</Title>
        <DescriptionWrapper>{description}</DescriptionWrapper>
      </InformationWrapper>
    </Container>
  );
};

export default Card;
