import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ProductImage, PRODUCT_IMAGE_TYPE } from '../';

const Container = styled.div`
  display: flex;
  width: 731px;
  padding: 0 24px;
`;

const TextWrapper = styled.div`
  margin-left: 18px;
`;

const Name = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
`;

const OrderPaymentItem = ({ src, alt, name, quantity }) => (
  <Container>
    <ProductImage type={PRODUCT_IMAGE_TYPE.SMALL} src={src} alt={alt} />
    <TextWrapper>
      <Name>{name}</Name>
      <div>수량: {quantity}</div>
    </TextWrapper>
  </Container>
);

OrderPaymentItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default OrderPaymentItem;
