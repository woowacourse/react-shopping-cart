import type { CartItemType } from '../../../types';
import { InputHTMLAttributes } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import styled from 'styled-components';

import { cartState, selectedCartState } from '../../../recoil/state';

export type CheckBoxProps = InputHTMLAttributes<HTMLInputElement>;

export default function CheckBox({ ...props }: CheckBoxProps) {
  const [selectedCart, setSelectedCart] = useRecoilState(selectedCartState);
  const cart = useRecoilValue(cartState);

  const isChecked = selectedCart.includes(Number(props.id)) || selectedCart.length === cart.length;

  function toggleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === 'all') {
      if (e.target.checked) {
        const productIds = cart.map((item: CartItemType) => item.product.id);
        setSelectedCart(productIds);
      } else setSelectedCart([]);
    } else {
      const productId = Number(e.target.id);

      if (e.target.checked) {
        setSelectedCart([...selectedCart, productId]);
      } else {
        const newSelectedCart = selectedCart.filter((id) => id !== productId);
        setSelectedCart(newSelectedCart);
      }
    }
  }

  return <Input type="checkbox" {...props} checked={isChecked} onChange={toggleCheck} />;
}

const Input = styled.input<CheckBoxProps>`
  width: 28px;
  height: 28px;

  appearance: none;
  border: 2px solid limegreen;
  border-radius: 2px;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }

  @media screen and (max-width: 767px) {
    width: 23px;
    height: 20px;
  }
`;
