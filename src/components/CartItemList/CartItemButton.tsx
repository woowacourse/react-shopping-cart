import { useRecoilState } from 'recoil';
import useAdjustCartItemQuantity from '../../hooks/useAdjustCartItemQuantity';
import * as Styled from './style';
import { selectedCartItemsState } from '../../recoil/selectedCardItems';
import useDeleteCartItem from '../../hooks/useDeleteCartItem';
import CheckedBox from '../assets/CheckedBox.svg';
import UnCheckedBox from '../assets/UnCheckedBox.svg';
import PlusButton from '../assets/PlusButton.svg';
import MinusButton from '../assets/MinusButton.svg';
import BlockMinusButton from '../assets/BlockMinusButton.svg';
import { ReactNode } from 'react';

interface CartItemQuantityProp {
  id: number;
  children: ReactNode;
}

export const CartItemQuantity = ({ id, children }: CartItemQuantityProp) => {
  const { minusCartItemQuantity, plusCartItemQuantity, cartItemQuantity } =
    useAdjustCartItemQuantity(id);
  return (
    <>
      <Styled.Button onClick={minusCartItemQuantity}>
        <img
          src={cartItemQuantity === 1 ? BlockMinusButton : MinusButton}
          alt="-"
        ></img>
      </Styled.Button>
      {children}
      <Styled.Button onClick={plusCartItemQuantity}>
        <img src={PlusButton} alt="+"></img>
      </Styled.Button>
    </>
  );
};

interface CartItemDeleteProp {
  id: number;
}

export const CartItemDelete = ({ id }: CartItemDeleteProp) => {
  const [isSelected, setIsSelected] = useRecoilState(
    selectedCartItemsState(id),
  );

  const handleDeleteCartItem = useDeleteCartItem();

  return (
    <>
      <Styled.Button onClick={() => setIsSelected((prop) => !prop)}>
        <img
          src={isSelected ? CheckedBox : UnCheckedBox}
          alt={isSelected ? '선택됨' : '선택되지 않음'}
        />
      </Styled.Button>
      <Styled.DeleteButton onClick={() => handleDeleteCartItem(id)}>
        삭제
      </Styled.DeleteButton>
    </>
  );
};
