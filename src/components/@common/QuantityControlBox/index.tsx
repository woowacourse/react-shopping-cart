import React from 'react';

import Box from 'components/@common/Box';
import Flex from 'components/@common/Flex';
import Button from 'components/@common/Button';
import Text from 'components/@common/Text';

interface QuantityControlBoxProps {
  quantity: number;
  handleIncreaseButton: () => Promise<void>;
  handleDecreaseButton: () => Promise<void>;
}

const QuantityControlBox = ({
  quantity,
  handleIncreaseButton,
  handleDecreaseButton,
}: QuantityControlBoxProps) => {
  return (
    <Box w="115px" borderWidth="1px" borderStyle="solid" borderColor="lightGray">
      <Flex>
        <Flex align="center">
          <Box w="73px">
            <Text size="24px" align="center">
              {quantity}
            </Text>
          </Box>
        </Flex>
        <Box w="42px">
          <Flex direction="column">
            <Button
              w="42px"
              h="30px"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="lightGray"
              onClick={handleIncreaseButton}
            >
              ▲
            </Button>
            <Button
              w="42px"
              h="30px"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="lightGray"
              onClick={handleDecreaseButton}
            >
              ▼
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default QuantityControlBox;
