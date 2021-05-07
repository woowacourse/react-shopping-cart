import React from 'react';
import PropTypes from 'prop-types';
import { FALLBACK } from '../../constants';
import {
  Order,
  OrderDetail,
  Image,
  Name,
  Quantity,
  ImageWrapper,
} from './index.styles';

const OrderItem = ({
  imgUrl = FALLBACK.PRODUCT.IMG_URL,
  imgAlt = FALLBACK.PRODUCT.IMG_ALT,
  name = FALLBACK.PRODUCT.NAME,
  quantity = 0,
}) => (
  <Order>
    <ImageWrapper>
      <Image src={imgUrl} alt={imgAlt} />
    </ImageWrapper>
    <OrderDetail>
      <Name>{name}</Name>
      <Quantity> 수량: {quantity}</Quantity>
    </OrderDetail>
  </Order>
);

OrderItem.propTypes = {
  imgUrl: PropTypes.string,
  imgAlt: PropTypes.string,
  name: PropTypes.string,
  quantity: PropTypes.number,
};

export default OrderItem;
