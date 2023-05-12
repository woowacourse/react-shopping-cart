import React, { memo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Cart } from "../../types/product";
import { ReactComponent as ShoppingCartImg } from "../../assets/icon/shopping-cart.svg";
import { cartAtomFamily, cartIDAtom } from "../../recoil/cartState";
import Counter from "../Counter";
import ProductImg from "./ProductImg";
import ProductInfo from "./ProductInfo";
import { targetProductSelector } from "../../recoil/fetchSelectors";

interface ProductCardProps {
  productId: number;
}

const ProductCard = ({ productId }: ProductCardProps) => {
  const [cart, setCart] = useRecoilState(cartAtomFamily(productId));
  const [cartID, setCartID] = useRecoilState(cartIDAtom);
  const product = useRecoilValue(targetProductSelector)(productId);
  const { id, name, price, imageUrl } = product;
  const productInCart = cart ? true : false;
  const [isCartClicked, setIsCartClicked] = useState(Boolean(productInCart));

  const addToCart = () => {
    const newProduct: Cart = {
      id,
      quantity: 1,
      product,
    };
    setCart(newProduct);
    setCartID([...cartID, productId]);
    setIsCartClicked(true);
  };

  const plusQuantity = () => {
    const updateProduct: Cart = {
      id,
      quantity: cart.quantity + 1,
      product,
    };

    setCart(updateProduct);
  };

  const minusQuantity = () => {
    const updateProduct: Cart = {
      id,
      quantity: cart.quantity - 1,
      product,
    };

    if (updateProduct.quantity === 0) {
      setIsCartClicked(false);
      const newCartID = cartID.filter((id) => id !== productId);
      setCartID(newCartID);
    }

    setCart(updateProduct);
  };

  return (
    <Styled.Container>
      <ProductImg src={imageUrl} alt={name} />
      <Styled.ProductDetail>
        <ProductInfo name={name} price={price} />
        {isCartClicked ? (
          <Counter
            plusQuantity={plusQuantity}
            minusQuantity={minusQuantity}
            quantity={cart.quantity}
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
