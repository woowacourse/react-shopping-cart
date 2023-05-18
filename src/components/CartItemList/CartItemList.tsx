import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { v1 } from 'uuid';
import { deleteCartItem } from '../../api/cartList';
import { cartAtom } from '../../store/cart';
import CartItem from '../CartItem/CartItem';
import CheckBox from '../common/CheckBox/CheckBox';

export type Select = {
  id: number;
  isSelected: boolean;
};

const CartItemList = () => {
  const cartList = useRecoilValue(cartAtom);
  const AllNotChecked = cartList.map((item) => ({
    id: item.id,
    isSelected: false,
  }));
  const AllChecked = cartList.map((item) => ({
    id: item.id,
    isSelected: true,
  }));
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [cartItemsState, setCartItemsState] = useState<Select[]>(AllNotChecked);
  const setCartAtom = useSetRecoilState(cartAtom);

  useEffect(() => {
    setCartItemsState(AllNotChecked);
  }, [cartList]);

  const toggleSelectAll = () => {
    setIsAllSelected(!isAllSelected);
    setCartItemsState(!isAllSelected ? AllChecked : AllNotChecked);
  };

  const countSelectedItems = () => {
    return cartItemsState.filter((item) => item.isSelected === true).length;
  };

  const deleteSelectedItems = () => {
    cartItemsState.forEach((item) => {
      if (item.isSelected) {
        deleteCartItem(item.id);
        setCartAtom((prev) => [...prev.filter((cart) => cart.id !== item.id)]);
      }
    });
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
