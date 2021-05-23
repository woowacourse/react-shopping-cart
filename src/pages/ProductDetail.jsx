import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { COLOR } from '../constants/color';
import { Button, BUTTON_TYPE, CartInsertingItemDialog, ProductImage, PRODUCT_IMAGE_TYPE } from '../components';
import useShoppingCart from '../hooks/useShoppingCart';
import useGettingData from '../hooks/useGettingData';
import { API_PATH } from '../constants/api';

const Container = styled.div`
  width: 640px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin: 0 auto;
  margin-bottom: 34px;
`;

const TopContent = styled.div`
  margin: 0 auto;
`;

const Title = styled.div`
  margin-top: 21px;
  padding-bottom: 33px;
  font-weight: 700;
  font-size: 32px;
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 34px 20px 54px 20px;
  border-top: 4px solid ${COLOR.GRAY_400};
  font-size: 24px;
  line-height: 24px;
`;

const ProductDetail = () => {
  const { state } = useLocation();
  const { data: product } = useGettingData(`${API_PATH.PRODUCT_LIST}/${state.id}`);
  const { insertShoppingCartItem, isDialogOpen, onConfirm, onCancel, dialogType } = useShoppingCart();

  return (
    <>
      <Container>
        <TopContent>
          <ProductImage type={PRODUCT_IMAGE_TYPE.LARGE} src={product.imageUrl} alt={product.name} />
          <Title>{product.name}</Title>
        </TopContent>
        <Description>
          <span>금액</span>
          <span>{product.price.toLocaleString('ko-KR')}원</span>
        </Description>
        <Button onClick={() => insertShoppingCartItem(state.id)} type={BUTTON_TYPE.LARGE}>
          장바구니
        </Button>
      </Container>

      {isDialogOpen && <CartInsertingItemDialog onConfirm={onConfirm} onCancel={onCancel} type={dialogType} />}
    </>
  );
};

export default ProductDetail;
