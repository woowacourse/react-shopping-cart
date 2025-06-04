import styled from '@emotion/styled';
import {css} from '@emotion/react';
import Button from '../../../../../common/Button';

type Props = {
  count: number;
  onPlusCount: () => void;
  onMinusCount: () => void;
};

const styleButton = css`
  border-radius: 10px;
  padding: 5px 5px;
`;

const CartCount = ({count, onPlusCount, onMinusCount}: Props) => {
  return (
    <CartCountSection>
      <Button
        onClick={onMinusCount}
        iconUrl="./minus-icon.svg"
        css={styleButton}
      />
      {count}
      <Button
        onClick={onPlusCount}
        iconUrl="./plus-icon.svg"
        css={styleButton}
      />
    </CartCountSection>
  );
};
export default CartCount;

const CartCountSection = styled.div`
  display: flex;
  gap: 13px;
  align-items: center;
`;
