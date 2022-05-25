import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import Flex from 'components/@common/Flex';
import LoadingSpinner from 'components/@common/LoadingSpinner';
import MarginWrapper from 'components/@common/MarginWrapper';
import Bar from 'components/@common/Bar';
import Text from 'components/@common/Text';
import { CartDetailButton } from 'components/@common/Button/Extends';
import SnackBar from 'components/@common/Snackbar';
import useProductDetail from 'hooks/useProductDetail';
import useSnackBar from 'hooks/useSnackBar';

import { loadCartProduct, registerCartProduct, updateCartProduct } from 'api/cart';
import { loadProduct } from 'api/product';
import { getCartProductListAsync } from 'store/cartProductList/thunk';
import { ADD_CART_DELAY_TIME, 상품저장메시지 } from 'constants/index';

const ProductDetail = () => {
  const {
    dispatch,
    navigate,
    data: { productId: id, product, setProduct },
  } = useProductDetail();
  const { message, showSnackbar, triggerSnackbar } = useSnackBar(false);
  let timer: ReturnType<typeof setTimeout>;
  let addCartButtonClickCount = useRef(0);

  const handleAddCartButton = async () => {
    try {
      addCartButtonClickCount.current += 1;
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        loadCartProduct(id).then((cartProduct) => {
          cartProduct === null
            ? registerCartProduct({
                id,
                thumbnail,
                name,
                price,
                quantity: addCartButtonClickCount.current,
              })
            : updateCartProduct(id, {
                ...cartProduct,
                quantity: cartProduct.quantity + addCartButtonClickCount.current,
              });
          addCartButtonClickCount.current = 0;
        });

        dispatch(getCartProductListAsync());
        triggerSnackbar(상품저장메시지);
      }, ADD_CART_DELAY_TIME);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    loadProduct(id)
      .then((res) => setProduct(res))
      .catch(() => navigate('/notFound'));
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
