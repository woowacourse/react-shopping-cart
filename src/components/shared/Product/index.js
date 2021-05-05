import React from 'react';
import { Container, InformationWrapper, Title, Description, ExtraWrapper } from './style';

const Product = ({ thumbnail, information, extra }) => {
  return (
    <Container>
      {thumbnail}
      <InformationWrapper>
        <Title>{information.title}</Title>
        <Description>{information.description}</Description>
      </InformationWrapper>
      <ExtraWrapper>{extra}</ExtraWrapper>
    </Container>
  );
};

export default Product;
