import React from 'react';
import styled from 'styled-components';
import ProductImage, { PRODUCT_IMAGE_TYPE } from '../productImage/ProductImage';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  padding: 0 24px;
  width: 731px;
`;

const TextWrapper = styled.div`
  margin-left: 18px;
`;

const Name = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
`;

const OrderPaymentItem = ({ image_url, name, quantity }) => (
  <Container>
    <ProductImage type={PRODUCT_IMAGE_TYPE.SMALL} src={image_url} alt={name} />
    <TextWrapper>
      <Name>{name}</Name>
      <div>수량: {quantity}</div>
    </TextWrapper>
  </Container>
);

OrderPaymentItem.propTypes = {
  image_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default OrderPaymentItem;
