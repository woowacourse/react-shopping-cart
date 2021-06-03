import React from 'react';
import PropTypes from 'prop-types';
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
  imgUrl,
  name,
  price,
  quantity,
  isCartButtonVisible,
  onCartButtonClick = () => {},
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
        <Button onClick={onCartButtonClick} backgroundColor={BUTTON_COLOR}>
          장바구니
        </Button>
      )}
    </ButtonWrapper>
  </Order>
);

OrderItem.propTypes = {
  id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  isCartButtonVisible: PropTypes.bool.isRequired,
};

export default OrderItem;
