import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Button } from '@/shared/components/Button/Button';
import { CheckBox } from '@/shared/components/CheckBox/CheckBox';
import { Flex } from '@/shared/components/Flex/Flex';
import { Text } from '@/shared/components/Text/Test';

import { QuantitySelector } from './QuantitySelector';

import NoImage from '../../../../public/NoImage.svg';
import { CartItem } from '../types/Cart.types';

type CartItemDetailProps = {
  isChecked: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onUpdateQuantity: (cartId: number, newQuantity: number) => void;
} & CartItem;

export const CartItemDetail = ({
  id,
  isChecked,
  quantity,
  product,
  onToggle,
  onRemove,
  onUpdateQuantity,
}: CartItemDetailProps) => {
  const imgUrl =
    !product.imageUrl || product.imageUrl === '' || product.imageUrl.includes('kream')
      ? NoImage
      : product.imageUrl;

  return (
    <Flex
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap="0"
      role="cart-item"
      css={css`
        border-top: 1px solid #e5e5e5;
        margin-top: 16px;
      `}
    >
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        gap="0"
        margin="10px 0 0 0 "
      >
        <CheckBox role="checkbox" checked={isChecked} onClick={() => onToggle(id)} />
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
        <StyledCartItemImg src={imgUrl} alt={`${imgUrl} 상품`} />
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
              {product.name}
            </Text>
            <Text type="Heading" weight="semibold">
              {product.price.toLocaleString()}원
            </Text>
          </Flex>
          <QuantitySelector
            count={quantity}
            onIncrease={() => onUpdateQuantity(id, quantity + 1)}
            onDecrease={() => onUpdateQuantity(id, quantity - 1)}
          />
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
