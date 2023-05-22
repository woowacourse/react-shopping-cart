import Input from './@common/Input';
import { css, styled } from 'styled-components';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from 'react';

interface Props {
  id: string;
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onIncrement: MouseEventHandler<HTMLButtonElement>;
  onDecrement: MouseEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const QuantityInput = ({ value, onChange, id, onIncrement, onDecrement, onBlur }: Props) => {
  return (
    <S.Wrapper>
      <S.MinusButton onClick={onDecrement} aria-label="decrease">
        <FaMinus />
      </S.MinusButton>

      <Input
        id={id}
        type="text"
        inputMode="numeric"
        value={value}
        styled={QuantityInputStyle}
        onChange={onChange}
        onBlur={onBlur}
      />
      <S.PlusButton onClick={onIncrement} aria-label="increase">
        <FaPlus />
      </S.PlusButton>
    </S.Wrapper>
  );
};

const Button = styled.button`
  height: 32px;
  background: none;
  margin: 0px;
  padding: 3px;
  color: #aaa;
  cursor: pointer;
`;

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    & svg {
      width: 16px;
      height: 16px;
      max-width: 26px;
    }
  `,
  MinusButton: styled(Button)`
    border: solid var(--gray-color-200);
    border-width: 1px 0px 1px 1px;
  `,
  PlusButton: styled(Button)`
    border: solid var(--gray-color-200);
    border-width: 1px 1px 1px 0px;
  `,
};

const QuantityInputStyle = css`
  width: 60px;
  height: 32px;
  font-size: 13px;
  text-align: center;
  color: var(--text-color);
  border: 1px solid var(--gray-color-200);
  border-width: 1px 0 1px 0;
`;

export default QuantityInput;
