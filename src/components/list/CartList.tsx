import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import type { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { Text } from '../common/Text/Text';
import CartListItem from '../box/CartListItem';
import useCartList from '../../hooks/useCartList';
import { checkedArrayState } from '../../recoil/atom';
import type { CartItem } from '../../types/types';

const CartList = () => {
  const { cartList, updateProductQuantity } = useCartList();

  const [checkedProductArray, setCheckedProductArray] = useRecoilState(checkedArrayState);

  const handleCheckedProductArray = (cartItem: CartItem, isChecked: boolean) => {
    if (isChecked) {
      const existProductIndex = checkedProductArray.findIndex(
        (product) => product.id === cartItem.id,
      );

      if (existProductIndex !== -1) {
        const newCheckedProductArray = checkedProductArray.slice();
        newCheckedProductArray.splice(existProductIndex, 1, cartItem);
        return setCheckedProductArray(newCheckedProductArray);
      }

      return setCheckedProductArray((prev) => [...prev, cartItem]);
    }

    return setCheckedProductArray((prev) => prev.filter((product) => product.id !== cartItem.id));
  };

  const handleOnAllCheckedButton = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) return setCheckedProductArray([...cartList]);

    return setCheckedProductArray([]);
  };

  useEffect(() => {
    setCheckedProductArray([...checkedProductArray]);
  }, [cartList]);

  return (
    <CartListWrapper>
      <Text size="smallest" weight="light" color="#333333">
        든든배송 상품 ({cartList.length}개)
      </Text>
      <CartItemListWrapper>
        {cartList.map((cartItem) => (
          <CartListItem
            key={cartItem.id}
            cartItem={cartItem}
            updateProductQuantity={updateProductQuantity}
            handleCheckedProductArray={handleCheckedProductArray}
          />
        ))}
      </CartItemListWrapper>
      <SelectAllWrapper>
        <CheckBox type="checkbox" onChange={handleOnAllCheckedButton} />
        <Text size="minimum" weight="light" color="#333333">
          전체선택({checkedProductArray.length}/{cartList.length})
        </Text>
        <SelectDeleteButton>선택삭제</SelectDeleteButton>
      </SelectAllWrapper>
    </CartListWrapper>
  );
};

export default CartList;

const CartListWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 50%;

  margin-top: 30px;
`;

const CartItemListWrapper = styled.div`
  height: 580px;

  margin-top: 20px;
  border-top: 3px solid #aaaaaa;
  overflow-y: scroll;
`;

const SelectAllWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  padding: 20px 10px;
  width: 100%;
`;

const SelectDeleteButton = styled.button`
  width: 90px;
  height: 30px;

  border: 1px solid #bbbbbb;

  font-size: 15px;
  color: #333333;
  cursor: pointer;
`;

export const CheckBox = styled.input`
  width: 28px;
  height: 28px;

  cursor: pointer;
`;
