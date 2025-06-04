import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Button from "../../../../../common/Button";

type Props = {
  count: number;
  onPlusCount: () => void;
  onMinusCount: () => void;
  testId: string;
};

const CartCount = ({ count, onPlusCount, onMinusCount, testId }: Props) => {
  const className = css`
    border-radius: 10px;
    padding: 5px 5px;
  `;

  return (
    <CartCountSection data-testid={testId}>
      <Button
        onClick={onMinusCount}
        iconUrl="./minus-icon.svg"
        css={className}
        testId={`minus-${testId}`}
      />
      {count}
      <Button
        onClick={onPlusCount}
        iconUrl="./plus-icon.svg"
        css={className}
        testId={`plus-${testId}`}
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
