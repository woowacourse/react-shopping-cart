import React from 'react';
import PropTypes from 'prop-types';
import { FALLBACK } from '../../constants';
import {
  Order,
  OrderDetail,
  Image,
  Name,
  PriceAndQuantity,
  ImageWrapper,
  ButtonWrapper,
} from './index.styles';
import BoxButton from '../common/BoxButton';

const OrderItem = ({
  imgUrl = FALLBACK.PRODUCT.IMG_URL,
  imgAlt = FALLBACK.PRODUCT.IMG_ALT,
  name = FALLBACK.PRODUCT.NAME,
  price,
  quantity = 0,
}) => (
  <Order>
    <ImageWrapper>
      <Image src={imgUrl} alt={imgAlt} />
    </ImageWrapper>
    <OrderDetail>
      <Name>{name}</Name>
      <PriceAndQuantity price={price}>
        {price && `${price}원 /`} 수량: {quantity}
      </PriceAndQuantity>
    </OrderDetail>
    <ButtonWrapper>
      <BoxButton buttonStyle="mint-button">장바구니</BoxButton>
    </ButtonWrapper>
  </Order>
);

OrderItem.propTypes = {
  imgUrl: PropTypes.string,
  imgAlt: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
};

export default OrderItem;
