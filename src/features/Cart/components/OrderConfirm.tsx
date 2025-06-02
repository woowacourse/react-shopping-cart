import { css } from '@emotion/react';

import { Button } from '@/shared/components/Button/Button';
import { Flex } from '@/shared/components/Flex/Flex';
import { Header } from '@/shared/components/Header/Header';
import { Text } from '@/shared/components/Text/Test';

import Back from '../../../../public/Back.png';
import { StepProps } from '../../../shared/types/funnel';
import { CartItem } from '../types/Cart.types';
import { useOrderInfo } from '../hooks/useOrderInfo';

type OrderConfirmProps = {
  cartItems: CartItem[];
} & StepProps;

export const OrderConfirm = ({ cartItems, onPrev }: OrderConfirmProps) => {
  const { hasCheckCartLength, totalQuantity, totalPrice } = useOrderInfo(cartItems);

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
