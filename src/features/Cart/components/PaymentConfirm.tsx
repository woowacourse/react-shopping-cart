import { css } from '@emotion/react';

import { Button } from '@/shared/components/Button/Button';
import { Flex } from '@/shared/components/Flex/Flex';
import { Text } from '@/shared/components/Text/Text';

import { StepProps } from '@/shared/types/funnel';
import { Coupon } from '@/features/Coupon/types/Coupon.types';
import { useOrderInfo } from '@/features/Cart/hooks/useOrderInfo';
import { useFinalPriceInfo } from '@/features/Cart/hooks/useFinalPriceInfo';

type PaymentConfirmProps = {
  selectedCoupons: Coupon[];
} & StepProps;

export const PaymentConfirm = ({ selectedCoupons, onPrev }: PaymentConfirmProps) => {
  const { hasCheckCartLength, totalQuantity } = useOrderInfo();
  const { finalPrice } = useFinalPriceInfo({ selectedCoupons });

  return (
    <>
      <Flex direction="column" justifyContent="center" alignItems="center" gap="30px" height="100%">
        <Text type="Heading" weight="bold">
          결제 확인
        </Text>
        <Text type="Caption" weight="regular">
          {`총 ${hasCheckCartLength}종류의 상품 ${totalQuantity}개를 주문했습니다.\n최종 결제 금액을 확인해 주세요.`}
        </Text>
        <Text type="Heading" weight="bold">
          {`총 결제 금액 ${finalPrice.toLocaleString()}원`}
        </Text>
      </Flex>
      <Button
        width="100%"
        size="xl"
        shape="square"
        css={css`
          position: sticky;
        `}
        onClick={onPrev}
      >
        장바구니로 돌아가기
      </Button>
    </>
  );
};
