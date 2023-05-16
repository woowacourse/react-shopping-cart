import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { v1 } from 'uuid';
import { cartListAtom, cartSelector } from '../../store/cart';
import CartItem from '../CartItem/CartItem';
import CheckBox from '../common/CheckBox/CheckBox';

export type Select = {
  id: number;
  isSelected: boolean;
  isDeleted: boolean;
};

const CartItemList = () => {
  const cartList = useRecoilValue(cartListAtom);
  const { cartsQuantity } = useRecoilValue(cartSelector);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<Select[]>(
    cartList.map((id) => ({ id, isSelected: false, isDeleted: false }))
  );

  const toggleSelectAll = () => {
    setIsAllSelected(!isAllSelected);
    setSelectedState(
      cartList.map((id) => ({
        id,
        isSelected: !isAllSelected,
        isDeleted: false,
      }))
    );
  };

  const countSelectedItems = () => {
    return selectedState.filter((item) => item.isSelected === true).length;
  };

  const deleteSelectedItems = () => {
    setSelectedState((prev) =>
      prev.map((item) => {
        if (item.isSelected === true) return { ...item, isDeleted: true };
        return item;
      })
    );
  };

  return (
    <Wrapper>
      <SubTitle>든든 배송 상품 ({cartsQuantity}개)</SubTitle>
      <Ul>
        {cartList.map((id) => {
          const uuid = v1();

          return (
            <CartItem
              key={uuid}
              id={id}
              selectState={
                selectedState.find((state) => state.id === id) as Select
              }
              setSelectedState={setSelectedState}
              setIsAllSelected={setIsAllSelected}
            />
          );
        })}

        <CheckBoxWrapper>
          <CheckBox onClick={toggleSelectAll} checked={isAllSelected} />
          <span>
            전체선택 ({countSelectedItems()}/{cartsQuantity})
          </span>
          <DeleteSelectedItemsButton onClick={deleteSelectedItems}>
            선택삭제
          </DeleteSelectedItemsButton>
        </CheckBoxWrapper>
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

  cursor: pointer;
`;
