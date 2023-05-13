import { WheelEventHandler, ChangeEventHandler, KeyboardEventHandler } from 'react';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { css, styled } from 'styled-components';
import Input from './common/Input';

interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const QuantityInput = ({ value, onChange }: Props) => {
  const handleScrollPrevent: WheelEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    currentTarget.blur();
  };

  const handleDotPrevent: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === '.') event.preventDefault();
  };

  return (
    <S.Wrapper>
      <Input
        type="number"
        value={value}
        inputMode="numeric"
        name="quantity"
        aria-label="quantity-input"
        autoComplete="on"
        min={0}
        max={99}
        css={QuantityInputStyle}
        onWheel={handleScrollPrevent}
        onChange={onChange}
        onKeyDown={handleDotPrevent}
      />

      <FaCaretUp aria-label="button-to-raise-quantity" />
      <FaCaretDown aria-label="button-to-lower-quantity" />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    & svg {
      position: absolute;
      z-index: -1;
      width: 26px;
      max-width: 26px;
      right: 6px;
      border: 1px solid var(--gray-color-200);
    }

    & svg:nth-child(3) {
      top: 28px;
    }
  `,
};

const QuantityInputStyle = css`
  width: 80px;
  height: 32px;
  font-size: 13px;
  text-align: center;
  color: var(--text-color);
  border: 1px solid var(--gray-color-200);
  background: none;
`;

export default QuantityInput;
