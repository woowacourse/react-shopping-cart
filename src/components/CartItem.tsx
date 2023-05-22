import React from "react";
import styled from "styled-components";
import QuantityCounter from "components/QuantityCounter";
import { useSetRecoilState } from "recoil";
import { cartSelector } from "recoil/cart";
import { CartProduct } from "types/domain";
import { removeCartItem } from "api/cartItems";

const CartItem = (item: CartProduct) => {
  const setProduct = useSetRecoilState(cartSelector(item.id));

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...item,
      isChecked: e.currentTarget.checked,
    });
  };

  const removeItem = async () => {
    const result = await removeCartItem(item.id);

    if (!result) {
      alert("장바구니 상품 제거 실패!");
      return;
    }

    setProduct(null);
  };

  return (
    <Wrapper>
      <input type="checkbox" value={item.id} checked={item.isChecked} onChange={handleCheckbox} />
      <img src={item.product.imageUrl} alt={`${item.product.name} 상품 이미지`} />
      <NameBox>{item.product.name}</NameBox>
      <ButtonBox onClick={removeItem}>🗑️</ButtonBox>
      <PriceBox>{(item.product.price * item.quantity).toLocaleString()}원</PriceBox>
      <QuantityCounter itemId={item.product.id} lowerBound={1} />
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  display: flex;

  position: relative;

  margin-bottom: 10px;

  border-top: 1.5px solid rgba(204, 204, 204, 1);
  padding: 15px 10px 10px 10px;

  & > img {
    width: 20%;
    border-radius: 5px;
  }
  & > input[type="checkbox"] {
    top: 15px;
    width: 40px;
    height: fit-content;

    transform: scale(1.6);
  }

  :last-child {
    align-self: center;

    height: 50%;

    margin-left: auto;
  }

  @media screen and (max-width: 800px) {
    padding-left: 0;
  }
`;

const NameBox = styled.div`
  width: 65%;
  margin: 15px 0 10px 10px;

  font-size: 17px;
  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    font-size: 13px;
  }
`;

const ButtonBox = styled.button`
  position: absolute;
  top: 6%;
  right: 1%;

  cursor: pointer;
`;

const PriceBox = styled.p`
  position: absolute;
  bottom: 0;
  right: 0;

  height: fit-content;
  font-size: 16px;
`;

export default React.memo(CartItem);
