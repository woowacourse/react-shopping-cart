import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';
import { Text } from '../common/Text/Text';
import CartListItem from '../box/CartListItem';
import useCartList from '../../hooks/useCartList';
import type { CartItem } from '../../types/types';

const CartList = ({
  setCheckedCartItemList,
  checkedCartItemList,
}: {
  setCheckedCartItemList: React.Dispatch<React.SetStateAction<CartItem[]>>;
  checkedCartItemList: CartItem[];
}) => {
  const { cartList, updateProductQuantity, removeProductInCartList } = useCartList();

  const handleCheckedCartItemList = (cartItem: CartItem, isChecked: boolean) => {
    if (isChecked) return setCheckedCartItemList((prev) => [...prev, cartItem]);

    return setCheckedCartItemList((prev) => prev.filter((product) => product.id !== cartItem.id));
  };

  const handleOnAllCheckedButton = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) return setCheckedCartItemList([...cartList]);

    return setCheckedCartItemList([]);
  };

  return (
    <CartListWrapper>
      <Text size="smallest" weight="light" color="#333333">
        든든배송 상품 ({cartList.length}개)
      </Text>
      <CartItemListWrapper>
        {cartList.map((cartItem) => (
          <CartListItem
            key={cartItem.id}
            checkedCartItemList={checkedCartItemList}
            setCheckedCartItemList={setCheckedCartItemList}
            cartItem={cartItem}
            updateProductQuantity={updateProductQuantity}
            removeProductInCartList={removeProductInCartList}
            handleCheckedCartItemList={handleCheckedCartItemList}
          />
        ))}
      </CartItemListWrapper>
      <SelectAllWrapper>
        <CheckBox type="checkbox" onChange={handleOnAllCheckedButton} />
        <Text size="minimum" weight="light" color="#333333">
          전체선택({checkedCartItemList.length}/{cartList.length})
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
