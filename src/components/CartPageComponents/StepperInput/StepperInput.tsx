import { ChangeEvent, useEffect, useState } from 'react';
import * as Styled from './StepperInput.styles.tsx';
import { Item } from '../../../types/CartList.ts';
import usePostUpdateCart from '../../../hooks/requests/usePostUpdateCart.ts';
import useCart from '../../../hooks/useCart.ts';

type StepperInputProps = {
  initialValue: number;
  cartItem: Item;
};

const StepperInput = ({ initialValue, cartItem }: StepperInputProps) => {
  const [value, setValue] = useState(initialValue.toString());
  const { updateCart } = useCart();
  const { optimisticUpdate } = usePostUpdateCart(cartItem);

  const handleIncrement = () => {
    setValue((prevValue) => {
      const parsedValue = parseInt(prevValue);
      return isNaN(parsedValue) ? '1' : String(parsedValue + 1);
    });
  };

  const handleDecrement = () => {
    setValue((prevValue) => {
      const parsedValue = parseInt(prevValue);
      return isNaN(parsedValue) ? '1' : String(Math.max(parsedValue - 1, 1));
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setValue(inputValue.replace(/\D/, ''));
  };

  useEffect(() => {
    const targetValue = parseInt(value, 10);
    const updatedCartItem = { ...cartItem, quantity: targetValue };
    optimisticUpdate(updatedCartItem, { itemId: cartItem.id, quantity: targetValue });
    updateCart(updatedCartItem);
  }, [value]);

  const handleInputBlur = () => {
    if (value === '') {
      setValue('1');
    }
  };

  return (
    <Styled.StepperInputWrapper>
      <Styled.Input type='text' value={value} onChange={handleInputChange} onBlur={handleInputBlur} />
      <Styled.ButtonWrapper>
        <Styled.Button onClick={handleIncrement}>+</Styled.Button>
        <Styled.Button onClick={handleDecrement}>-</Styled.Button>
      </Styled.ButtonWrapper>
    </Styled.StepperInputWrapper>
  );
};

export default StepperInput;
