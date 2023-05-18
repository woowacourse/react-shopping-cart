import { InputHTMLAttributes } from 'react';
import { useRecoilState } from 'recoil';

import styled from 'styled-components';

import { selectedCartState } from '../../../recoil/state';
import useCart from '../../../hooks/useCart';

export type CheckBoxProps = InputHTMLAttributes<HTMLInputElement>;

export default function CheckBox({ ...props }: CheckBoxProps) {
  const [selectedCart, setSelectedCart] = useRecoilState(selectedCartState);
  const [cart] = useCart();

  const isChecked = selectedCart.includes(Number(props.id));

  function toggleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const productId = Number(e.target.id);

    if (productId) {
      if (e.target.checked) {
        setSelectedCart([...selectedCart, productId]);
      } else {
        const newSelectedCart = selectedCart.filter((id) => id !== productId);
        setSelectedCart(newSelectedCart);
      }
    } else {
      //전체선택 체크박스인 경우
      if (e.target.checked) {
        e.target.checked = true;
        const productIds = cart.map((item) => item.product.id);
        setSelectedCart(productIds);
      } else {
        setSelectedCart([]);
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
