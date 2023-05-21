import { WheelEventHandler, ChangeEventHandler, FormEventHandler, FormEvent } from 'react';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { css, styled } from 'styled-components';
import { NOT_NUMBER } from '../../constants';
import Input from '../common/Input';

interface Props {
  id: string;
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const QuantityInput = ({ id, value, onChange }: Props) => {
  const handleScrollPrevent: WheelEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    currentTarget.blur();
  };

  const handleDigitsOnlyAllow: FormEventHandler<HTMLInputElement> = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>) => {
    const input = currentTarget;
    const newValue = input.value.replace(NOT_NUMBER, '');

    input.value = '';
    input.value = newValue;
  };

  return (
    <QuantityStyle.Wrapper>
      <Input
        type="number"
        value={value}
        id={id}
        inputMode="numeric"
        name="quantity"
        aria-label="quantity-input"
        autoComplete="on"
        autoFocus
        min={0}
        max={99}
        css={QuantityInputStyle}
        onWheel={handleScrollPrevent}
        onChange={onChange}
        onInput={handleDigitsOnlyAllow}
      />

      <FaCaretUp aria-label="button-to-raise-quantity" />
      <FaCaretDown aria-label="button-to-lower-quantity" />
    </QuantityStyle.Wrapper>
  );
};

const QuantityStyle = {
  Wrapper: styled.div`
    position: relative;
    width: 80px;

    & svg {
      position: absolute;
      right: 0;
      z-index: 1;
      width: 26px;
      max-width: 26px;
      border: 1px solid var(--gray-color-200);
      font-size: 16px;
    }

    & svg:nth-child(3) {
      top: 16px;
    }
  `,
};

const QuantityInputStyle = css`
  position: absolute;
  right: 0;
  z-index: 2;
  width: 80px;
  height: 32px;
  font-size: 13px;
  text-align: center;
  color: var(--text-color);
  border: 1px solid var(--gray-color-200);
  background: none;
`;

export default QuantityInput;
