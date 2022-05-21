import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ReactComponent as CartIcon } from 'assets/icon/Cart.svg';

import { CartButton } from 'components/@common/Button/Extends';
import Flex from 'components/@common/Flex';
import Box from 'components/@common/Box';
import Text from 'components/@common/Text';
import { EllipsisText } from 'components/@common/Text/Extends';

import {
  loadCartProduct,
  loadCartProductList,
  updateCartProduct,
  registerCartProduct,
} from 'api/cart';
import { startCartProductList, setCartProductList } from 'store/cartProductList/actions';
import { ProductData } from 'types';

const Product = ({ id, thumbnail, name, price }: ProductData) => {
  const dispatch = useDispatch();

  const handleAddCartButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const cartProduct = await loadCartProduct(id);

      if (cartProduct === null) {
        registerCartProduct({ id, thumbnail, name, price, quantity: 1 });
      } else {
        updateCartProduct(id, { ...cartProduct, quantity: cartProduct.quantity + 1 });
      }

      dispatch(startCartProductList());
      loadCartProductList().then((res) => dispatch(setCartProductList(res)));
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
