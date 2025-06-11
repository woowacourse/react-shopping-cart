import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Button } from '@/shared/components/Button/Button';
import { CheckBox } from '@/shared/components/CheckBox/CheckBox';
import { Flex } from '@/shared/components/Flex/Flex';
import { Text } from '@/shared/components/Text/Text';

import { QuantitySelector } from '@/features/Cart/components/QuantitySelector';

import NoImage from '../../../../public/NoImage.svg';
import { CartItem } from '../types/Cart.types';
import { useCartContext } from '../context/CartProvider';

type CartItemDetailProps = {
  variant: 'cart' | 'review';
  isChecked?: boolean;
} & CartItem;

export const CartItemDetail = ({
  id,
  isChecked,
  quantity,
  product,
  variant = 'cart',
}: CartItemDetailProps) => {
  const { toggleCheck, removeCartItem, updateQuantity } = useCartContext();
  const isCartMode = variant === 'cart';

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
      {isCartMode && (
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          gap="0"
          margin="10px 0 0 0 "
        >
          <CheckBox role="checkbox" checked={isChecked} onClick={() => toggleCheck?.(id)} />
          <Button
            variant="outlined"
            size="xs"
            color="#e5e5e5"
            fontColor="black"
            css={css`
              margin-top: 8px;
            `}
            onClick={() => removeCartItem?.(id)}
          >
            삭제
          </Button>
        </Flex>
      )}

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
          {isCartMode ? (
            <QuantitySelector
              count={quantity}
              onIncrease={() => updateQuantity?.(id, quantity + 1)}
              onDecrease={() => updateQuantity?.(id, quantity - 1)}
            />
          ) : (
            <Text type="Caption">{quantity}개</Text>
          )}
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
