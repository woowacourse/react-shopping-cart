import { css } from '@emotion/react';

import { Button } from '@/shared/components/Button';
import { Flex } from '@/shared/components/Flex';
import { Header } from '@/shared/components/Header';
import { Text } from '@/shared/components/Text';

import Back from '../../../../public/Back.png';
import { StepProps } from '../../../shared/types/funnel';
import { useOrderConfirm } from '../hooks/useOrderConfirm';
import { CartItemList } from '../types/Cart.types';

export const OrderConfirm = ({ cartItems, onPrev }: CartItemList & StepProps) => {
  const { hasCheckCartLength, totalQuantity, totalPrice } = useOrderConfirm({ cartItems });
  return (
    <>
      <Header
        left={
          <Button onClick={onPrev} size="xs">
            <img src={Back} width="25px" height="25px" />
          </Button>
        }
      />
      <Flex direction="column" justifyContent="center" alignItems="center" gap="30px" height="100%">
        <Text type="Heading" weight="bold">
          주문 확인
        </Text>
        <Text type="Caption" weight="regular">
          {`총 ${hasCheckCartLength}종류의 상품 ${totalQuantity}개를 주문합니다.\n 최종 결제 금액을 확인해 주세요.`}
        </Text>
        <Text type="Heading" weight="bold">
          {`총 결제 금액 ${totalPrice?.toLocaleString()}원`}
        </Text>
      </Flex>
      <Button
        width="100%"
        size="xl"
        shape="square"
        css={css`
          position: sticky;
        `}
        disabled
      >
        결제하기
      </Button>
    </>
  );
};
