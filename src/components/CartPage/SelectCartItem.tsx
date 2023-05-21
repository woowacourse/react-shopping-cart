import styled from 'styled-components';
import CheckIconImage from '../../asset/check_icon.svg';
import {
  cartRequestAction,
  cartState,
  cartTotalState,
} from '../../atoms/cartState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartSelects } from '../../atoms/cartSelects';
import { useEffect, useState } from 'react';
import { CartType } from '../../type/cart';

export default function SelectCartItem() {
  const cart = useRecoilValue(cartState({ action: 'GET' }));
  const cartTotal = useRecoilValue(cartTotalState);
  const [cartSelectsState, setCartSelectsState] = useRecoilState(cartSelects);
  const setRequestAction = useSetRecoilState(
    cartRequestAction({ action: 'GET' })
  );
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    setCheckAll(cartSelectsState.size === cartTotal);
  }, [cartTotal, cartSelectsState]);
  useEffect(() => {
    if (checkAll) {
      const newCartSelects = cart.map((cartItem: CartType) => cartItem.id);
      setCartSelectsState(new Set(newCartSelects));
    }
    if (!checkAll && cartSelectsState.size === cartTotal) {
      setCartSelectsState(new Set());
    }
  }, [checkAll]);

  return (
    <SelectCartItemContainer>
      <SelectBox
        checked={checkAll}
        type='checkbox'
        onChange={() => {
          setCheckAll((checkAll) => !checkAll);
        }}
      />
      <Text>
        전체선택({cartSelectsState.size}/{cartTotal})
      </Text>
      <SelectDeleteButton
        onClick={() => {
          cartSelectsState.forEach((cartSelect) => {
            setRequestAction({
              action: 'DELETE',
              payload: { cartId: cartSelect },
            });
            setCartSelectsState(new Set());
          });
        }}
      >
        선택 삭제
      </SelectDeleteButton>
    </SelectCartItemContainer>
  );
}

const SelectCartItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SelectBox = styled.input`
  appearance: none;
  width: 2.8rem;
  height: 2.8rem;
  border: 1px solid ${({ theme }) => theme.colors.blue_green};
  border-radius: 2px;
  cursor: pointer;

  &:checked {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary};
    background-image: url(${CheckIconImage});
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const Text = styled.span`
  ${({ theme }) => theme.fonts.name}
  margin: 0 1rem;
`;

const SelectDeleteButton = styled.button`
  background-color: transparent;
  ${({ theme }) => theme.fonts.name}
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: 0.5rem 1rem;
  cursor: pointer;
`;
