import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/shared/components/Flex';
import { Text } from '@/shared/components/Text';

import NoImage from '../../../../../public/NoImage.svg';
import { CartItem } from '../../../Cart/types/Cart.types';

type CartConfirmDetailProps = {
  isChecked: boolean;
} & CartItem;

export const CartConfirmDetail = ({ quantity, product }: CartConfirmDetailProps) => {
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
          <Text type="Caption" weight="regular">
            {quantity}개
          </Text>
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
