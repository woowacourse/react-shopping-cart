import React, { memo, useState } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ReactComponent as ShoppingCartImg } from '../../assets/icon/shopping-cart.svg';
import { cartListAtom, cartAtomFamily } from '../../store/cart';
import { Product } from '../../types/product';
import Counter from '../common/Counter/Counter';
import ProductImg from './ProductImg/ProductImg';
import ProductInfo from './ProductInfo/ProductInfo';

const ProductCard = ({ id, name, price, imageUrl }: Product) => {
  const setCart = useSetRecoilState(cartListAtom);
  const [productInCart, setProductInCart] = useRecoilState(cartAtomFamily(id));
  const setProductInCart2 = useResetRecoilState(cartAtomFamily(id));
  const [isCartClicked, setIsCartClicked] = useState(
    Boolean(productInCart.quantity)
  );

  const addToCart = () => {
    const newCart = {
      id,
      quantity: 1,
      product: { id, name, imageUrl, price },
    };

    setProductInCart(newCart);
    setCart((prev) => [...prev, id]);
    setIsCartClicked(true);
  };

  const plusOne = () => {
    setProductInCart((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const minusOne = () => {
    setProductInCart((prev) => ({
      ...prev,
      quantity: prev.quantity - 1,
    }));

    if (productInCart.quantity <= 1) {
      setCart((prev) => prev.filter((item) => item !== id));
      setProductInCart2();
      setIsCartClicked(false);
      return;
    }
  };

  return (
    <Container>
      <ProductImg
        imageUrl={imageUrl}
        size={{ width: '282px', height: '282px' }}
      />
      <ProductDetail>
        <ProductInfo name={name} price={price} />
        {isCartClicked ? (
          <Counter
            plusOne={plusOne}
            minusOne={minusOne}
            quantity={productInCart.quantity}
          />
        ) : (
          <ShoppingCart onClick={addToCart}>
            <ShoppingCartImg />
          </ShoppingCart>
        )}
      </ProductDetail>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 282px;
`;

const ProductDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ShoppingCart = styled.button`
  display: flex;

  cursor: pointer;
`;

export default memo(ProductCard);
