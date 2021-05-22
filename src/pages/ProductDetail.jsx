import React from 'react';
import styled from 'styled-components';
import useFetch from '../hooks/useFetch';
import useInsertingItemToShoppingCart from '../hooks/useInsertingItemToShoppingCart';
import useScrollPosition from '../hooks/useScrollPosition';
import { useLocation } from 'react-router';
import { requestGetItemList } from '../request/request';
import { API_PATH } from '../constants/api';
import { COLOR } from '../constants/color';
import { Button, BUTTON_TYPE, Loading, ProductImage, PRODUCT_IMAGE_TYPE } from '../components';

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
  const { insertShoppingCart, isDialogOpen, Dialog } = useInsertingItemToShoppingCart({
    productId: state.id,
  });

  const { isLoading, data } = useFetch({
    fetchFunc: () => requestGetItemList(API_PATH.PRODUCT_LIST + `/${state.id}`),
    isInitSetting: true,
  });

  useScrollPosition(!isLoading);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container>
        <TopContent>
          <ProductImage type={PRODUCT_IMAGE_TYPE.LARGE} src={data.imageUrl} alt={data.name} />
          <Title>{data.name}</Title>
        </TopContent>
        <Description>
          <span>금액</span>
          <span>{data.price.toLocaleString('ko-KR')}원</span>
        </Description>
        <Button onClick={insertShoppingCart} type={BUTTON_TYPE.LARGE}>
          장바구니
        </Button>
      </Container>

      {isDialogOpen && <Dialog />}
    </>
  );
};

export default ProductDetail;
