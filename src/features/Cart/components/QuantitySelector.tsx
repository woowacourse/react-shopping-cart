import styled from '@emotion/styled';

import { Flex } from '@/shared/components/Flex';
import { Text } from '@/shared/components/Text';

export type QuantitySelectorProps = {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export const QuantitySelector = ({ count, onIncrease, onDecrease }: QuantitySelectorProps) => {
  return (
    <Flex direction="row" justifyContent="initial" alignItems="center" gap="8px">
      <StyledOutlineButton disabled={count === 1} onClick={onDecrease} role="minus-button">
        -
      </StyledOutlineButton>
      <Text type="Body" weight="regular" role="cart-item-quantity">
        {count}
      </Text>
      <StyledOutlineButton onClick={onIncrease} role="plus-button">
        +
      </StyledOutlineButton>
    </Flex>
  );
};

const StyledOutlineButton = styled.button`
  width: 28px;
  height: 28px;
  font-size: 25px;
  font-weight: 300;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 0 3px 0;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
