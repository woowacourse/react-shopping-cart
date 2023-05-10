import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Product, Cart } from '../../types/product';
import { ReactComponent as ShoppingCartImg } from '../../assets/icon/shopping-cart.svg';
import { cartAtom } from '../../recoil/cartState';

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

  const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetProductIndex = cart.findIndex((item) => item.id === id);
    if (targetProductIndex === -1) return;

    const updatedCartProduct: Cart = {
      ...cart[targetProductIndex],
      quantity: Number(e.target.value),
    };

    setCart((cart) => [
      ...cart.slice(0, targetProductIndex),
      updatedCartProduct,
      ...cart.slice(targetProductIndex + 1),
    ]);
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
          <Styled.QuantityInput
            type='number'
            defaultValue={1}
            min={0}
            onChange={updateQuantity}
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

  QuantityInput: styled.input.attrs({ type: 'number' })`
    width: 64px;
    height: 28px;

    border: 1px solid #dddddd;

    padding-left: 8px;
  `,

  ShoppingCart: styled.button`
    display: flex;

    cursor: pointer;
  `,
};
export default ProductCard;
