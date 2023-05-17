// @ts-nocheck

import styled from "styled-components";
import CartProductItem from "../CartProductItem/CartProductItem";
import { useRecoilValue } from "recoil";
import { fetchCartItemsSelector } from "../../store/apiProductSelector";

const CartProductList = () => {
  const cartItems = useRecoilValue(fetchCartItemsSelector);

  return (
    <Container>
      <Title>여기에 대충 카테고리</Title>
      <List>
        {[...cartItems].map((cartItem) => {
          const { id, name, price, imageUrl } = cartItem.product;
          const quantity = cartItem.quantity;

          return (
            <CartProductItem
              key={id}
              productId={id}
              productName={name}
              productPrice={price}
              productImage={imageUrl}
              productQuantity={quantity}
            />
          );
        })}
      </List>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 766px;
`;

const Title = styled.div`
  margin-top: 20px;
  padding: 10px;
  height: 55px;
  color: gray;
  font-size: 20px;
  border-bottom: 2px solid gray;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 766px;
`;

export default CartProductList;
