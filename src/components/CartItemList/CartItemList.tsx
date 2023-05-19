import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { v1 } from 'uuid';
import { deleteCartItem } from '../../api/cartList';
import { cartAtom, checkedValue, totalAmountAtom } from '../../store/cart';
import { Cart } from '../../types/product';
import CartItem from '../CartItem/CartItem';
import CheckBox from '../common/CheckBox/CheckBox';

export type Select = {
  id: number;
  isSelected: boolean;
};

const CartItemList = () => {
  const [cartList, setCartList] = useRecoilState(cartAtom);
  const { ALL_CHECKED, NO_CHECKED } = useRecoilValue(checkedValue);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [isSelectedList, setIsSelectedList] = useState<Select[]>(NO_CHECKED);
  const [totalAmount, setTotalAmount] = useRecoilState(totalAmountAtom);

  useEffect(() => {
    setIsSelectedList(NO_CHECKED);
  }, [cartList]);

  useEffect(() => {
    const total = isSelectedList.reduce((a, b) => {
      if (b.isSelected) {
        let cart = cartList.find((item) => item.id === b.id) as Cart;
        return a + cart.quantity * cart.product.price;
      }
      return a;
    }, 0);
    setTotalAmount(total);
  }, [isSelectedList]);

  const toggleSelectAll = () => {
    setIsAllSelected(!isAllSelected);
    setIsSelectedList(!isAllSelected ? ALL_CHECKED : NO_CHECKED);
  };

  const countSelectedItems = () => {
    return isSelectedList.filter((item) => item.isSelected === true).length;
  };

  const deleteSelectedItems = () => {
    isSelectedList.forEach((item) => {
      if (item.isSelected) {
        deleteCartItem(item.id);
        setCartList((prev) => [...prev.filter((cart) => cart.id !== item.id)]);
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
                isSelectedList.find((state) => state.id === item.id) as Select
              }
              setIsSelectedList={setIsSelectedList}
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
