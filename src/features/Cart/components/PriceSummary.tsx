import styled from '@emotion/styled';

import { Flex } from '@/shared/components/Flex/Flex';
import { Text } from '@/shared/components/Text/Text';

import { usePriceInfo } from '@/features/Cart/hooks/usePriceInfo';
import { useCartContext } from '../context/CartProvider';

type PriceSummaryProps = {
  variant?: 'cart' | 'review';
  discountAmount?: number;
};

export const PriceSummary = ({
  variant = 'cart',
  discountAmount = 0,
}: PriceSummaryProps) => {
  const isCartMode = variant === 'cart';
  const { orderPrice, deliveryFee, totalPrice } = usePriceInfo();

  return (
    <Flex
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap="10px"
      width="100%"
      padding={isCartMode ? '20px' : '0px'}
    >
      <Text type="Caption" weight="regular">
        🛍️ 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </Text>
      <StyledSpacing />
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap="0"
        width="100%"
        padding="0 10px"
      >
        <Text type="Body">주문 금액</Text>
        <Text type="Heading">{orderPrice.toLocaleString()}원</Text>
      </Flex>
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap="0"
        width="100%"
        padding="0 10px"
      >
        <Text type="Body">쿠폰 할인 금액</Text>
        <Text type="Heading">{discountAmount.toLocaleString()}원</Text>
      </Flex>
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap="0"
        width="100%"
        padding="0 10px"
      >
        <Text type="Body">배송비</Text>
        <Text type="Heading" data-testid="delivery-fee">
          {deliveryFee.toLocaleString()}원
        </Text>
      </Flex>
      <StyledSpacing />
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap="0"
        width="100%"
        padding="0 10px"
      >
        <Text type="Body">총 결제 금액</Text>
        <Text type="Heading">{(totalPrice - discountAmount).toLocaleString()}원</Text>
      </Flex>
    </Flex>
  );
};

const StyledSpacing = styled.hr`
  width: 100%;
  height: 1px;
  background-color: rgb(218, 218, 218);
  border: none;
  margin: 0;
`;
