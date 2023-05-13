import React, { memo, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ReactComponent as ShoppingCartImg } from '../../assets/icon/shopping-cart.svg';
import { cartAtom, cartAtomState } from '../../recoil/cartState';
import { Product } from '../../types/product';
import Counter from '../common/Counter/Counter';
import ProductImg from './ProductImg/ProductImg';
import ProductInfo from './ProductInfo/ProductInfo';

const ProductCard = ({ id, name, price, imageUrl }: Product) => {
  const setCart = useSetRecoilState(cartAtom);
  const [productInCart, setProductInCart] = useRecoilState(cartAtomState(id));
  const [isCartClicked, setIsCartClicked] = useState(Boolean(productInCart));

  const addToCart = () => {
    setProductInCart((prev) => ({ ...prev, quantity: 1 }));
    setCart((prev) => [...prev, id]);
    setIsCartClicked(true);
  };

  const plusOne = () => {
    setProductInCart((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
    console.log(productInCart);
  };

  const minusOne = () => {
    setProductInCart((prev) => ({
      ...prev,
      quantity: prev.quantity - 1 < 0 ? 0 : prev.quantity - 1,
    }));
    if (productInCart.quantity <= 1) {
      setCart((prev) => [...prev.filter((num) => num !== id)]);
      setIsCartClicked(false);
    }
    console.log(productInCart);
  };

  return (
    <Styled.Container>
      <ProductImg imageUrl={imageUrl} />
      <Styled.ProductDetail>
        <ProductInfo name={name} price={price} />
        {isCartClicked ? (
          <Counter
            plusOne={plusOne}
            minusOne={minusOne}
            quantity={productInCart.quantity}
          />
        ) : (
          <Styled.ShoppingCart onClick={addToCart}>
            <ShoppingCartImg />
          </Styled.ShoppingCart>
        )}
      </Styled.ProductDetail>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.li`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 282px;
  `,

  ProductDetail: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  ShoppingCart: styled.button`
    display: flex;

    cursor: pointer;
  `,
};
export default memo(ProductCard);
