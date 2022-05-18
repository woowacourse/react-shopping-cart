import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as CartIcon } from 'assets/icon/Cart.svg';

import { CartButton } from 'components/common/Button';
import Flex from 'components/common/Flex';
import { ProductData } from 'types';
import { loadCartProduct, updateCartProduct, registerCartProduct, loadCartProductList } from 'api';
import { startCartProductList, setCartProductList } from 'store/cartProductList/actions';
import { useDispatch } from 'react-redux';

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
    <Styled.Wrapper to={`/product/${id}`}>
      <Styled.ThumbnailBox>
        <Flex justify="center" align="center">
          <img src={thumbnail} alt="상품을 나타내는 대표 이미지" />
        </Flex>
      </Styled.ThumbnailBox>
      <Styled.Content>
        <Flex justify="space-between">
          <Styled.Description>
            <Styled.Name>{name}</Styled.Name>
            <Styled.Price>{price.toLocaleString()} 원</Styled.Price>
          </Styled.Description>
          <CartButton onClick={handleAddCartButton}>
            <CartIcon />
          </CartButton>
        </Flex>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled(Link)`
    width: 282px;
    height: 358px;
    display: flex;
    flex-direction: column;
    gap: 14px;
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
  Description: styled.div`
    width: 200px;
  `,
  Name: styled.p`
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `,
  Price: styled.p``,
};

export default Product;
