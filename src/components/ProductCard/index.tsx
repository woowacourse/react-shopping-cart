import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Product, Cart } from '../../types/product';
import { ReactComponent as ShoppingCartImg } from '../../assets/icon/shopping-cart.svg';
import { cartAtom } from '../../recoil/cartState';
import Counter from '../Counter';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const [isCartClicked, setIsCartClicked] = useState(false);
  const { id, name, price, imageUrl } = product;

  const addToCart = () => {
    const newProduct: Cart = {
      id,
      quantity: 1,
      product,
    };
    setCart((cart) => [...cart, newProduct]);
    setIsCartClicked(true);
  };

  const plusOne = () => {
    const newProduct = cart.map((cart) => {
      if (cart.id !== id) return cart;
      return { ...cart, quantity: cart.quantity + 1 };
    });
    setCart(() => [...newProduct]);
  };

  const minusOne = () => {
    const newProdoct = cart
      .map((cart) => {
        if (cart.id !== id) return cart;
        return { ...cart, quantity: cart.quantity - 1 };
      })
      .filter((cart) => cart.quantity > 0);

    setCart(() => [...newProdoct]);

    if (!newProdoct.find((item) => item.id === id)) setIsCartClicked(false);
  };

  return (
    <Styled.Container>
      <Styled.Img src={imageUrl} />
      <Styled.ProductDetail>
        <Styled.ProductInfo>
          <Styled.ProductName>{name}</Styled.ProductName>
          <Styled.ProductPrice>{price.toLocaleString()}원</Styled.ProductPrice>
        </Styled.ProductInfo>
        {isCartClicked ? (
          <Counter
            plusOne={plusOne}
            minusOne={minusOne}
            quantity={cart.find((item) => item.id === id)?.quantity}
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

  Img: styled.img`
    width: 282px;
    height: 282px;

    cursor: pointer;
  `,

  ProductDetail: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    padding-left: 16px;
  `,

  ProductName: styled.span`
    font-weight: 400;
    font-size: 16px;

    letter-spacing: 0.5px;
  `,

  ProductPrice: styled.span`
    font-weight: 400;
    font-size: 20px;

    letter-spacing: 0.5px;
  `,

  ShoppingCart: styled.button`
    display: flex;

    cursor: pointer;
  `,
};
export default ProductCard;
