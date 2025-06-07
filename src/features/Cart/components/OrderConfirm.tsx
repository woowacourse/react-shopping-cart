import { css } from '@emotion/react';

import { Button } from '@/shared/components/Button/Button';
import { Flex } from '@/shared/components/Flex/Flex';
import { Header } from '@/shared/components/Header/Header';
import { Text } from '@/shared/components/Text/Text';

import Back from '../../../../public/Back.png';
import { StepProps } from '@/shared/types/funnel';
import { CartItem } from '@/features/Cart/types/Cart.types';
import { useOrderInfo } from '@/features/Cart/hooks/useOrderInfo';
import { CartListContainer } from '../container/CartListContainer';
import { CartItemDetail } from './CartItemDetail';
import { RemoteAreaCheckBox } from './RemoteAreaCheckBox';
import { PriceSummary } from './PriceSummary';
import { useCartInfo } from '../hooks/useCartInfo';
import { useContext, useEffect, useState } from 'react';
import { CouponModal } from '@/features/Coupon/components/CouponModal';
import { getCouponList } from '@/features/Coupon/api/coupon';
import { useFetchData } from '@/shared/hooks/useFetchData';
import { Coupon, CouponResponse } from '@/features/Coupon/types/Coupon.types';
import { isError } from '@/shared/utils/isError';
import { ToastContext } from '@/shared/context/ToastProvider';

type OrderConfirmProps = {
  cartItems: CartItem[];
} & StepProps;

export const OrderConfirm = ({ cartItems, onPrev }: OrderConfirmProps) => {
  const { hasCheckCartLength, totalQuantity, totalPrice } = useOrderInfo(cartItems);
  const { selectedCartItems } = useCartInfo(cartItems);
  const { showToast } = useContext(ToastContext);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [showCouponList, setShowCouponList] = useState(false);
  const coupon = useFetchData<CouponResponse[]>({ autoFetch: getCouponList });

  useEffect(() => {
    if (coupon.data) {
      setCoupons(coupon.data.map((c) => ({ ...c, checked: false })));
    }
  }, [coupon.data]);
  

  useEffect(() => {
    if (coupon.error && isError(coupon.error)) {
      showToast('쿠폰 정보를 불러올 수 없습니다.');
    }
  }, [coupon.error, showToast]);

  const onToggleCoupon = (id: number) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.id === id ? { ...coupon, checked: !coupon.checked } : coupon
      )
    );
  }

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
        <Text type="Heading" weight="bold">
          주문 확인
        </Text>
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
          // disabled={cartItems?.length === 0 || selectedCartItemCount === 0}
        >
          쿠폰 적용
        </Button>
        <RemoteAreaCheckBox />
        <PriceSummary variant="review" cartItems={cartItems} />
      </Flex>
      <Button
        width="100%"
        size="xl"
        shape="square"
        css={css`
          position: sticky;
        `}
        // disabled
      >
        결제하기
      </Button>
      {showCouponList && (
        <CouponModal
          coupons={coupons}
          onClose={function (): void {
            throw new Error('Function not implemented.');
          }}
          onToggleCoupon={onToggleCoupon}
          onApply={function (): void {
            throw new Error('Function not implemented.');
          }}
          totalDiscount={0}
        />
      )}
    </>
  );
};
