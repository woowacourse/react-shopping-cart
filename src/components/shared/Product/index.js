import React from 'react';
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

export default Product;
