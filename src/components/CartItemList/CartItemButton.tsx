import { useRecoilState } from 'recoil';
import useAdjustCartItemQuantity from '../../hooks/useAdjustCartItemQuantity';
import * as Styled from './style';
import { selectedCartItemsState } from '../../recoil/selectedCardItems';
import useDeleteCartItem from '../../hooks/useDeleteCartItem';

import PlusButton from '../assets/PlusButton.svg';
import MinusButton from '../assets/MinusButton.svg';
import BlockMinusButton from '../assets/BlockMinusButton.svg';
import { ReactNode } from 'react';
import CheckButton from '../common/CheckButton/CheckButton';

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

interface CartItemButtonHeaderProp {
  id: number;
}

export const CartItemButtonHeader = ({ id }: CartItemButtonHeaderProp) => {
  const [isSelected, setIsSelected] = useRecoilState(
    selectedCartItemsState(id),
  );

  const handleDeleteCartItem = useDeleteCartItem();

  return (
    <>
      <CheckButton
        isSelected={isSelected}
        setIsSelected={() => setIsSelected((prop) => !prop)}
      />
      <Styled.DeleteButton onClick={() => handleDeleteCartItem(id)}>
        삭제
      </Styled.DeleteButton>
    </>
  );
};
