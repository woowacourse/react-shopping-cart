import styled from 'styled-components';
import CheckIconImage from '../../asset/check_icon.svg';
import {
  cartRequestAction,
  cartState,
  cartTotalState,
} from '../../atoms/cartState';
import {
  useRecoilState,
  useRecoilValue_TRANSITION_SUPPORT_UNSTABLE,
  useSetRecoilState,
} from 'recoil';
import { cartSelects } from '../../atoms/cartSelects';
import { Suspense, useEffect, useState, useTransition } from 'react';
import { CartType } from '../../type/cart';
import ErrorBoundary from '../common/ErrorBoundary';

export default function SelectCartItem() {
  const cart = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(
    cartState({ action: 'GET' })
  );
  const cartTotal = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(cartTotalState);

  const [cartSelectsState, setCartSelectsState] = useRecoilState(cartSelects);
  const setRequestAction = useSetRecoilState(
    cartRequestAction({ action: 'GET' })
  );
  const [checkAll, setCheckAll] = useState(false);

  const [inTrans, startTrans] = useTransition();

  useEffect(() => {
    setCheckAll(cartSelectsState.size === cartTotal && cartTotal !== 0);
  }, [cartTotal, cartSelectsState]);

  const deleteSelectCartItem = () => {
    startTrans(() => {
      cartSelectsState.forEach((cartSelect) => {
        setRequestAction({
          action: 'DELETE',
          payload: { cartId: cartSelect },
        });
        setCartSelectsState(new Set());
      });
    });
  };

  return (
    <ErrorBoundary>
      {inTrans ? <div>loading..</div> : null}
      <Suspense>
        <SelectCartItemContainer>
          <SelectBox
            checked={checkAll}
            type='checkbox'
            onChange={() => {
              setCheckAll((checkAll) => !checkAll);

              if (!checkAll) {
                const newCartSelects = cart.map(
                  (cartItem: CartType) => cartItem.id
                );
                setCartSelectsState(new Set(newCartSelects));
              }
              if (checkAll && cartSelectsState.size === cartTotal) {
                setCartSelectsState(new Set());
              }
            }}
          />
          <Text>
            전체선택({cartSelectsState.size}/{cartTotal})
          </Text>
          <SelectDeleteButton onClick={deleteSelectCartItem}>
            선택 삭제
          </SelectDeleteButton>
        </SelectCartItemContainer>
      </Suspense>
    </ErrorBoundary>
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
