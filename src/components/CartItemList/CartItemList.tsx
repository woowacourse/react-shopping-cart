import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { v1 } from 'uuid';
import { cartAtom } from '../../store/cart';
import CartItem from '../CartItem/CartItem';
import CheckBox from '../common/CheckBox/CheckBox';

export type Select = {
  id: number;
  isSelected: boolean;
  isDeleted: boolean;
};

const CartItemList = () => {
  const cartList = useRecoilValue(cartAtom);
  const initCartItemStateValue = cartList.map((item) => ({
    id: item.id,
    isSelected: false,
    isDeleted: false,
  }));
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [cartItemsState, setCartItemsState] = useState<Select[]>(
    initCartItemStateValue
  );

  const toggleSelectAll = () => {
    setIsAllSelected(!isAllSelected);
    setCartItemsState(initCartItemStateValue);
  };

  const countSelectedItems = () => {
    return cartItemsState.filter((item) => item.isSelected === true).length;
  };

  const deleteSelectedItems = () => {
    setCartItemsState((prev) =>
      prev.map((item) => {
        if (item.isSelected === true) return { ...item, isDeleted: true };
        return item;
      })
    );
  };

  return (
    <Wrapper>
      <SubTitle>든든 배송 상품 ({cartList.length}개)</SubTitle>
      <Ul>
        {cartList.map((item) => {
          const uuid = v1();

          return (
            <CartItem
              key={uuid}
              id={item.id}
              cartItemState={
                cartItemsState.find((state) => state.id === item.id) as Select
              }
              setCartItemsState={setCartItemsState}
              setIsAllSelected={setIsAllSelected}
            />
          );
        })}

        {Boolean(cartList.length) && (
          <CheckBoxWrapper>
            <CheckBox onClick={toggleSelectAll} checked={isAllSelected} />
            <span>
              전체선택 ({countSelectedItems()}/{cartList.length})
            </span>
            <DeleteSelectedItemsButton onClick={deleteSelectedItems}>
              선택삭제
            </DeleteSelectedItemsButton>
          </CheckBoxWrapper>
        )}
      </Ul>
    </Wrapper>
  );
};

export default CartItemList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 720px;

  margin-top: 16px;
`;

const SubTitle = styled.div`
  width: 90%;
  height: 40px;

  border-bottom: 4px solid #aaaaaa;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  padding: 8px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 8px;

  width: 100%;
`;

const DeleteSelectedItemsButton = styled.button`
  border: 1px solid #bbbbbb;

  padding: 8px 12px;
`;
