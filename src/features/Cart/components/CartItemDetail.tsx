import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/shared/components/Flex';
import { Text } from '@/shared/components/Text';
import { Button } from '@/shared/components/Button';
import { QuantitySelector } from './QuantitySelector';

export const CartItemDetail = ({
  id,
  quantity,
  product,
}: {
  id: number;
  quantity: number;
  product: object;
}) => {
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      gap=""
      // css={css`
      //   border-top: 1px solid #e5e5e5;
      //   margin-top: 16px;
      // `}
    >
      <Flex
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap="4px"
        height="100px"
        padding="8px 0"
        margin="12px 0 0 0"
      >
        {/* <StyledCartItemImg src={product.imageUrl} alt={product.} /> */}
        <Flex
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          gap="4px"
          width="100%"
          height="100%"
          margin="0 0 0 8px"
        >
          <Text type="Body" weight="semibold">
            dd
          </Text>
          <Text type="Caption" weight="regular">
            0원
          </Text>
          <QuantitySelector count={123} onIncrease={() => {}} onDecrease={() => {}} />
        </Flex>
      </Flex>
      <Button
        variant="outlined"
        size="xs"
        color="#e5e5e5"
        fontColor="black"
        // css={css`
        //   margin-top: 8px;
        // `}
        // onClick={removeCartItem}
      >
        삭제
      </Button>
    </Flex>
  );
};

const StyledCartItemImg = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
`;
