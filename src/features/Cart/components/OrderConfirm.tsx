import { css } from '@emotion/react';
import { useCartInfo } from '../hooks/useCartInfo';
import { useOrderInfo } from '../hooks/useOrderInfo';

import { Button } from '../../../shared/components/Button/Button';
import { Flex } from '../../../shared/components/Flex/Flex';
import { Header } from '../../../shared/components/Header/Header';
import { Text } from '../../../shared/components/Text/Text';

import Back from '../../../../public/Back.png';
import { StepProps } from '../../../shared/types/funnel';
import { CartListContainer } from '../container/CartListContainer';
import { CartItemDetail } from './CartItemDetail';
import { RemoteAreaCheckBox } from './RemoteAreaCheckBox';
import { PriceSummary } from './PriceSummary';
import { CouponModal } from '../../../features/Coupon/components/CouponModal';
import { useCouponSelection } from '../../../features/Coupon/hooks/useCouponSelection';

import { Coupon } from '../../../features/Coupon/types/Coupon.types';

type OrderConfirmProps = {
  onSelectCoupons: (selected: Coupon[]) => void;
} & StepProps;

export const OrderConfirm = ({ onSelectCoupons, onPrev, onNext }: OrderConfirmProps) => {
  const { selectedCartItems } = useCartInfo();
  const { hasCheckCartLength, totalQuantity } = useOrderInfo();

  const {
    coupons,
    discountAmount,
    showCouponList,
    selectedCoupons,
    setShowCouponList,
    ToggleCoupon,
    ApplyCoupons,
  } = useCouponSelection();

  const handleApplyCoupons = () => {
    onSelectCoupons(selectedCoupons);
    setShowCouponList(false);
    onNext?.();
  };

  return (
    <>
      <Header
        left={
          <Button onClick={onPrev} size="xs">
            <img src={Back} width="25px" height="25px" />
          </Button>
        }
      />
      <Flex
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="30px"
        height="100%"
        width="100%"
        padding="40px 20px"
      >
        <Text type="Heading" weight="bold">주문 확인</Text>
        <Text type="Caption" weight="regular">
          {`총 ${hasCheckCartLength}종류의 상품 ${totalQuantity}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`}
        </Text>

        <CartListContainer variant="review">
          {selectedCartItems?.map((item) => (
            <CartItemDetail key={item.id} variant="review" {...item} />
          ))}
        </CartListContainer>

        <Button
          width="100%"
          size="xl"
          shape="rounded"
          color="white"
          fontColor="gray"
          css={css`
            position: sticky;
            border: 1px solid gray;
            font-size: medium;
          `}
          onClick={() => setShowCouponList((prev) => !prev)}
          data-testid="show-coupon-button"
        >
          쿠폰 적용
        </Button>

        <RemoteAreaCheckBox />
        <PriceSummary variant="review" discountAmount={discountAmount} />
      </Flex>

      <Button
        width="100%"
        size="xl"
        shape="square"
        css={css`
          position: sticky;
        `}
        onClick={handleApplyCoupons}
      >
        결제하기
      </Button>

      {showCouponList && (
        <CouponModal
          coupons={coupons}
          onClose={() => setShowCouponList(false)}
          onToggleCoupon={ToggleCoupon}
          onApply={ApplyCoupons}
        />
      )}
    </>
  );
};
