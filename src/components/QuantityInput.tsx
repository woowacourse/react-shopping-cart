import Input from './common/Input';
import { css, styled } from 'styled-components';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

const QuantityInput = () => {
  return (
    <S.Wrapper>
      <Input type="number" inputStyle={Style} min={1} max={99} />
      <FaCaretUp />
      <FaCaretDown />
    </S.Wrapper>
  );
};
const S = {
  Wrapper: styled.div`
    position: absolute;

    & svg {
      width: 26px;
      max-width: 26px;
      position: absolute;
      right: 0;
      z-index: -1;
      border: 1px solid var(--gray-color-200);
    }

    & svg:nth-child(2) {
      top: 0;
    }

    & svg:nth-child(3) {
      top: 16px;
    }
  `,
};

const Style = css`
  width: 80px;
  height: 32px;
  font-size: 13px;
  text-align: center;
  color: var(--text-color);
  border: 1px solid var(--gray-color-200);
  background: none;
`;

export default QuantityInput;
