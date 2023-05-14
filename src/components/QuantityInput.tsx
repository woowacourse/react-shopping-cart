import Input from './common/Input';
import { css, styled } from 'styled-components';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { WheelEventHandler, ChangeEventHandler } from 'react';

interface Props {
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const QuantityInput = ({ value, onChange }: Props) => {
  const handleScrollPrevent: WheelEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    currentTarget.blur();
  };

  return (
    <S.Wrapper>
      <Input
        type="number"
        value={value}
        styled={QuantityInputStyle}
        min={0}
        max={99}
        onWheel={handleScrollPrevent}
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.key === '-' || event.key === '+' || event.key === 'e' || event.key === '.') {
            event.preventDefault();
          }
        }}
      />

      <FaCaretUp />
      <FaCaretDown />
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
      right: 0;
      border: 1px solid var(--gray-color-200);
    }

    & svg:nth-child(2) {
      top: 12px;
      right: 6px;
    }

    & svg:nth-child(3) {
      top: 28px;
      right: 6px;
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
