import React from 'react';
import { styled } from 'styled-components';
import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import useCartList from '@hooks/useCartList';
import CartItem from './CartItem';

const CartList = () => {
  const {
    data,
    checkBoxTotalIdOnChange,
    checkBox,
    checkBoxTotalId,
    removeCartOnClick,
    check,
    refetch,
  } = useCartList();

  return (
    <CartListWrapper>
      {data && data.map((product, idx) => {
        return (
          <div key={idx}>
            <hr />
            <CartItem
              key={product.id}
              id={product.product.id}
              name={product.product.name}
              imageUrl={product.product.imageUrl}
              quantity={product.quantity}
              price={product.product.price}
              refetch={refetch}
            />
          </div>
        );
      })}
      <CartPageBottom>
        <CheckBox onChange={checkBoxTotalIdOnChange} check={check} />
        <CartSelectorText>
          전체선택({checkBox.length}/{checkBoxTotalId.length})
        </CartSelectorText>
        <Button
          text="선택삭제"
          onClick={removeCartOnClick}
          width="100px"
          height="35px"
          fontSize="16px"
          background="white"
          color="#333333"
        />
      </CartPageBottom>
    </CartListWrapper>
  );
};

const CartListWrapper = styled.div`
  width: 55%;
  border-top: 4px solid #aaaaaa;

  @media (max-width: 1023px) {
    width: 100%;
  }
`;

const CartPageBottom = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;

  margin-bottom: 50px;
`;
const CartSelectorText = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* or 125% */

  letter-spacing: 0.5px;

  margin: 0 13px;

  color: #333333;
`;

export default CartList;
