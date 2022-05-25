import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as CartIcon } from 'assets/icon/Cart.svg';

import { CartButton } from 'components/@common/Button/Extends';
import Flex from 'components/@common/Flex';
import Box from 'components/@common/Box';
import Text from 'components/@common/Text';
import { EllipsisText } from 'components/@common/Text/Extends';
import SnackBar from 'components/@common/Snackbar';
import useAppDispatch from 'hooks/useAppDispatch';
import useSnackBar from 'hooks/useSnackBar';

import { loadCartProduct, updateCartProduct, registerCartProduct } from 'api/cart';
import { getCartProductListAsync } from 'store/cartProductList/thunk';
import { ProductData } from 'types';
import { ADD_CART_DELAY_TIME, 상품저장메시지 } from 'constants/index';

const Product = ({ id, thumbnail, name, price }: ProductData) => {
  const dispatch = useAppDispatch();
  const { message, showSnackbar, triggerSnackbar } = useSnackBar(false);
  let timer: ReturnType<typeof setTimeout>;
  let addCartButtonClickCount = useRef(0);

  const handleAddCartButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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

  return (
    <Styled.Container to={`/product/${id}`}>
      <Flex direction="column" gap="14px">
        <Styled.ThumbnailBox>
          <Flex justify="center" align="center">
            <img src={thumbnail} alt="상품을 나타내는 대표 이미지" />
          </Flex>
        </Styled.ThumbnailBox>
        <Styled.Content>
          <Flex justify="space-between">
            <Box w="200px">
              <EllipsisText>{name}</EllipsisText>
              <Text>{price.toLocaleString()} 원</Text>
            </Box>
            <CartButton onClick={handleAddCartButton}>
              <CartIcon />
            </CartButton>
          </Flex>
        </Styled.Content>
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
  Container: styled(Link)`
    width: 282px;
    height: 358px;
    box-shadow: 3px 3px 5px 0px #00000040;
  `,
  ThumbnailBox: styled.div`
    height: 282px;
    overflow: hidden;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  `,
  Content: styled.div`
    padding: 0 10px;
    line-height: 22px;
    letter-spacing: 0.5px;
  `,
};

export default Product;
