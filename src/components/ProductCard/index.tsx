import React, { memo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Cart } from "../../types/product";
import { ReactComponent as ShoppingCartImg } from "../../assets/icon/shopping-cart.svg";
import { cartAtom } from "../../recoil/cartState";
import Counter from "../Counter";
import ProductImg from "./ProductImg";
import ProductInfo from "./ProductInfo";
import { targetProductSelector } from "../../recoil/fetchSelectors";

interface ProductCardProps {
  productId: number;
}

const ProductCard = ({ productId }: ProductCardProps) => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const product = useRecoilValue(targetProductSelector)(productId);
  const { id, name, price, imageUrl } = product;
  const productInCart = cart.find((item) => item.id === id);
  const [isCartClicked, setIsCartClicked] = useState(Boolean(productInCart));

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
      <ProductImg imageUrl={imageUrl} />
      <Styled.ProductDetail>
        <ProductInfo name={name} price={price} />
        {isCartClicked ? (
          <Counter
            plusOne={plusOne}
            minusOne={minusOne}
            quantity={productInCart?.quantity}
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
