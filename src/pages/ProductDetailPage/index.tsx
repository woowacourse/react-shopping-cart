import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Flex from 'components/@common/Flex';
import LoadingSpinner from 'components/@common/LoadingSpinner';
import MarginWrapper from 'components/@common/MarginWrapper';
import Bar from 'components/@common/Bar';
import Text from 'components/@common/Text';
import { CartDetailButton } from 'components/@common/Button/Extends';
import SnackBar from 'components/@common/Snackbar';

import { loadCartProduct, registerCartProduct, updateCartProduct } from 'api/cart';
import { loadProduct } from 'api/product';
import { CartProductListAction } from 'store/cartProductList/reducer';
import { getCartProductListAsync } from 'store/cartProductList/thunk';
import useSnackBar from 'hooks/useSnackBar';
import { ProductData, AppDispatch } from 'types';

const ProductDetail = () => {
  const params = useParams();
  const id = Number(params.id);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch<CartProductListAction>>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const { message, showSnackbar, triggerSnackbar } = useSnackBar(false);

  const handleAddCartButton = async () => {
    try {
      const cartProduct = await loadCartProduct(id);
      if (cartProduct === null) {
        registerCartProduct({ id, thumbnail, name, price, quantity: 1 });
      } else {
        updateCartProduct(id, { ...cartProduct, quantity: cartProduct.quantity + 1 });
      }

      dispatch(getCartProductListAsync());
      triggerSnackbar('장바구니에 상품이 담겼습니다.');
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    loadProduct(id)
      .then((res) => setProduct(res))
      .catch(() => navigate('/notFound'));

    dispatch(getCartProductListAsync());
  }, []);

  if (product === null) {
    return <LoadingSpinner />;
  }

  const { name, price, thumbnail } = product;

  return (
    <Styled.Container>
      <Flex direction="column" align="center">
        <Styled.ThumbnailBox>
          <img src={thumbnail} alt="상품 상세 이미지" />
        </Styled.ThumbnailBox>
        <Styled.Content>
          <Flex direction="column" gap="15px">
            <MarginWrapper mt="5px" ml="10px" mb="5px" mr="10px">
              <Text size="22px" weight={700}>
                {name}
              </Text>
            </MarginWrapper>
            <Bar h="2px" color="gray" />
            <MarginWrapper mt="10px" ml="10px" mb="30px" mr="10px">
              <Flex justify="space-between">
                <Text weight={500}>금액</Text>
                <Text weight={500}>{price.toLocaleString()}원</Text>
              </Flex>
            </MarginWrapper>
          </Flex>
        </Styled.Content>
        <CartDetailButton onClick={handleAddCartButton}>장바구니</CartDetailButton>
      </Flex>
      {showSnackbar &&
        createPortal(
          <SnackBar message={message} />,
          document.getElementById('snackbar') as HTMLElement,
        )}
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    width: 400px;
    margin: 0 auto;
  `,
  ThumbnailBox: styled.div`
    width: 100%;
    img {
      width: 100%;
    }
  `,
  Content: styled.div`
    width: 100%;
    margin-top: 20px;
  `,
};

export default ProductDetail;
