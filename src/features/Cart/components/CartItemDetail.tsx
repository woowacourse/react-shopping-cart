import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/shared/components/Flex';
import { Text } from '@/shared/components/Text';
import { Button } from '@/shared/components/Button';
import { QuantitySelector } from './QuantitySelector';

import { CartItem } from '../types/Cart.types';
import { CheckBox } from '@/shared/components/CheckBox';
import { deleteCartItem } from '@/api/cart';

type CartItemDetailProps = {
  isChecked: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
} & CartItem;

export const CartItemDetail = ({
  id,
  isChecked,
  quantity,
  product,
  onToggle,
  onRemove,
}: CartItemDetailProps) => {
  console.log('isChecked', isChecked);
  return (
    <Flex
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap="0"
      css={css`
        border-top: 1px solid #e5e5e5;
        margin-top: 16px;
      `}
    >
      <Flex
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width="100%"
        gap="0"
        margin="10px 0 0 0 "
      >
        <CheckBox checked={isChecked} onClick={() => onToggle(id)} />
        <Button
          variant="outlined"
          size="xs"
          color="#e5e5e5"
          fontColor="black"
          css={css`
            margin-top: 8px;
          `}
          onClick={() => onRemove(id)}
        >
          삭제
        </Button>
      </Flex>
      <Flex
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap="4px"
        height="110px"
        padding="8px 0"
        margin="12px 0 0 0"
      >
        <StyledCartItemImg src={product.imageUrl} alt={product.imageUrl} />
        <Flex
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          gap="4px"
          width="100%"
          height="100px"
          margin="0 0 0 16px"
        >
          <Flex direction="column" justifyContent="flex-start" alignItems="flex-start" gap="0">
            <Text type="Caption" weight="regular">
              상품이름
            </Text>
            <Text type="Heading" weight="semibold">
              0원
            </Text>
          </Flex>
          <QuantitySelector count={123} onIncrease={() => {}} onDecrease={() => {}} />
        </Flex>
      </Flex>
    </Flex>
  );
};

const StyledCartItemImg = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
`;
