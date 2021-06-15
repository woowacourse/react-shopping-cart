import React from 'react';
import styled from 'styled-components';
import Button, { BUTTON_TYPE } from '../button/Button';
import ProductImage, { PRODUCT_IMAGE_TYPE } from '../productImage/ProductImage';
import { COLOR } from '../../constants/color';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { insertShoppingCartItem } from '../../redux/shoppingCart';

const Container = styled.div`
  display: flex;
  padding: 0 24px;
`;

const TextWrapper = styled.div`
  margin-left: 33px;
`;

const Name = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
`;

const Info = styled.div`
  color: ${COLOR.GRAY_600};
`;

const OrderItem = ({ product_id, image_url, name, price, quantity }) => {
  const dispatch = useDispatch();

  const handleOrderItem = ({ ...product }) => {
    const shoppingCartItem = { ...product, isChecked: true, quantity: 1 };

    dispatch(insertShoppingCartItem(shoppingCartItem));
  };

  return (
    <Container>
      <ProductImage type={PRODUCT_IMAGE_TYPE.SMALL} src={image_url} alt={name} />
      <TextWrapper>
        <Name>{name}</Name>
        <Info>
          {price.toLocaleString('ko-KR')}원 / 수량: {quantity}개
        </Info>
      </TextWrapper>
      <div style={{ marginLeft: 'auto' }}>
        <Button type={BUTTON_TYPE.SMALL} onClick={() => handleOrderItem({ product_id, image_url, name, price })}>
          장바구니
        </Button>
      </div>
    </Container>
  );
};

OrderItem.propTypes = {
  image_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default OrderItem;
