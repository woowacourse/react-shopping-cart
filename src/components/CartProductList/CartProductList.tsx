import styled from "styled-components";
import CartProductItem from "../CartProductItem/CartProductItem";
import { useRecoilValue, useRecoilState } from "recoil";
import { fetchCartProductsSelector } from "../../store/fetchAtoms";
import { hideListAtom } from "../../store/cartProductsAtoms";
import CheckBoxSelectBundle from "../CheckBoxSelectBundle/CheckBoxSelectBundle";
import { useEffect } from "react";

const CartProductList = () => {
  const [cartProducts, resetCartProducts] = useRecoilState(
    fetchCartProductsSelector
  );
  const hideList = useRecoilValue(hideListAtom);

  useEffect(() => {
    resetCartProducts([]);
  }, [resetCartProducts]);

  return (
    <Container>
      <Title>장바구니 목록</Title>
      <List>
        {cartProducts.map((cartProduct) => {
          const { id, name, price, imageUrl } = cartProduct.product;
          const quantity = cartProduct.quantity;

          return !hideList[id] ? (
            <CartProductItem
              key={id}
              productId={id}
              productName={name}
              productPrice={price}
              productImage={imageUrl}
              productQuantity={quantity}
            />
          ) : null;
        })}
      </List>
      <CheckBoxSelectBundle />
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
