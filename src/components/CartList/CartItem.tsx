import React from 'react';
import { styled } from 'styled-components';
import BucketCounter from '@components/common/BucketCounter';
import CheckBox from '@components/common/CheckBox';
import useCartItem from '@hooks/useCartItem';
import { CART_ITEM_REMOVE_BUTTON } from '@assets/images';

interface CartItemProps {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
  refetch: () => void;
}

const CartItem = ({
  id,
  name,
  imageUrl,
  quantity,
  price,
  refetch,
}: CartItemProps) => {
  const { check, checkBoxOnChange, deleteItem} = useCartItem(id);

  const removeItem = async () => {
    deleteItem();

    refetch();
  };

  return (
    <CartItemWrapper>
      <CheckBox onChange={checkBoxOnChange} check={check} />
      <CartItemImg src={imageUrl} alt="상품 사진" />
      <CartItemName>{name}</CartItemName>
      <CartItemInformationWrapper>
        <RemoveCardItemImg src={CART_ITEM_REMOVE_BUTTON} onClick={removeItem} />
        <BucketCounter
          id={id}
          quantity={quantity}
          kind="big"
          refetch={refetch}
        />
        <CartItemMoney>
          {(price * quantity).toLocaleString('ko-KR')}
        </CartItemMoney>
      </CartItemInformationWrapper>
    </CartItemWrapper>
  );
};

const CartItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;

  width: 100%;
  margin: 23px 0;
`;

const CartItemImg = styled.img`
  width: 144px;
  height: 147px;

  margin-left: 15px;

  background: rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    width: 90px;
    height: 90px;
  }
`;

const CartItemName = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  margin-left: 20px;

  letter-spacing: 0.5px;

  color: #333333;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const CartItemInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  flex-grow: 1;

  height: 147px;
`;

const RemoveCardItemImg = styled.img`
  width: 24px;
  height: 24px;

  cursor: pointer;
`;

const CartItemMoney = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  letter-spacing: 0.5px;

  color: #333333;
`;

export default CartItem;
