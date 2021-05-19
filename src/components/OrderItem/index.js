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
import Button from '../common/Button';

const BUTTON_COLOR = 'var(--color-mint)';

const OrderItem = ({
  id,
  imgUrl = FALLBACK.PRODUCT.IMG_URL,
  name = FALLBACK.PRODUCT.NAME,
  price = FALLBACK.PRODUCT.PRICE,
  quantity = FALLBACK.PRODUCT.QUANTITY,
  isCartButtonVisible,
}) => (
  <Order>
    <ImageWrapper>
      <Image src={imgUrl} alt={name} />
    </ImageWrapper>
    <OrderDetail>
      <Name>{name}</Name>
      <PriceAndQuantity price={price}>
        {price >= 0 && `${price}원 /`} 수량: {quantity}
      </PriceAndQuantity>
    </OrderDetail>
    <ButtonWrapper>
      {isCartButtonVisible && (
        <Button onClick={() => {}} backgroundColor={BUTTON_COLOR}>
          장바구니
        </Button>
      )}
    </ButtonWrapper>
  </Order>
);

OrderItem.propTypes = {
  id: PropTypes.string,
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  isCartButtonVisible: PropTypes.bool,
};

export default OrderItem;
