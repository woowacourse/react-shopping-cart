import { FooterButton, Loading, SelectBox } from '@/components/common';
import BorderButton from '@/components/common/borderButton/BorderButton';
import { CartItemType } from '@/components/features/cart/types';
import { getCoupons } from '@/components/features/coupon/api/getCoupons';
import CouponModal from '@/components/features/coupon/couponModal/CouponModal';
import useAppliedCoupons from '@/components/features/coupon/hooks/useAppliedCoupons';
import useOrderPriceSummary from '@/components/features/coupon/hooks/useOrderSummary';
import Coupon from '@/components/features/coupon/models/coupon';
import { CouponType } from '@/components/features/coupon/models/coupon.types';
import OrderCheckTitle from '@/components/features/orderCheck/orderCheckTitle/OrderCheckTitle';
import OrderItem from '@/components/features/orderCheck/orderItem/OrderItem';
import OrderPriceSummary from '@/components/features/orderCheck/orderPriceSummary/OrderPriceSummary';
import { ROUTE } from '@/shared/constants/route';
import { useJaeO } from '@/shared/data/useJaeO';
import { Modal } from '@jae-o/modal-component-module';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as S from './OrderCheckContents.styles';

interface OrderCheckContentsProps {
  orderItems: CartItemType[];
}

function OrderCheckContents({ orderItems }: OrderCheckContentsProps) {
  const [isRemoteArea, setIsRemoteArea] = useState(false);
  const { data: coupons, isLoading } = useJaeO<CouponType[], Coupon[]>({
    fetchKey: 'coupons',
    fetchFn: getCoupons,
    convertFn: (data) =>
      data.map((coupon) => new Coupon(coupon, orderItems, false)),
  });
  const { appliedCouponIds, applyCouponIds, isCouponApplied } =
    useAppliedCoupons();
  const { orderPrice, discountAmount, deliveryFee, paymentPrice } =
    useOrderPriceSummary({
      orderItems,
      isRemoteArea,
      coupons,
      isCouponApplied,
    });
  const navigate = useNavigate();

  const toggleRemoteArea = () => {
    coupons?.forEach((coupon) =>
      coupon.updateDiscountAmount(orderItems, !isRemoteArea)
    );
    setIsRemoteArea((prev) => !prev);
  };

  const moveToPaymentCheck = () => {
    navigate(ROUTE.paymentCheck, {
      state: {
        orderItemQuantity: orderItems.length,
        totalProductQuantity: orderItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        ),
        paymentPrice,
      },
    });
  };

  useEffect(() => {
    if (!coupons || coupons.length === 0) return;

    const couponsSortedByDiscountAmount = [...coupons]
      .sort((a, b) => b.discountAmount - a.discountAmount)
      .slice(0, 2)
      .filter((coupon) => !coupon.disable);
    applyCouponIds(
      new Set(couponsSortedByDiscountAmount.map((coupon) => coupon.data.id))
    );
  }, [applyCouponIds, coupons, orderItems]);

  if (isLoading || !coupons) return <Loading />;

  return (
    <Modal>
      <S.Container>
        <OrderCheckTitle />
        <S.OrderItemList>
          {orderItems.map((item) => (
            <OrderItem key={item.id} cartItem={item} />
          ))}
        </S.OrderItemList>
        <Modal.OpenTrigger asChild>
          <BorderButton>쿠폰 적용</BorderButton>
        </Modal.OpenTrigger>
        <S.ShippingOptionBox>
          <S.ShippingOptionTitle>배송 정보</S.ShippingOptionTitle>
          <S.ShippingOptionSelectRow>
            <SelectBox
              id="shippingOption"
              selected={isRemoteArea}
              onClick={toggleRemoteArea}
            />
            <S.ShippingOptionSelectText htmlFor="shippingOption">
              제주도 및 도서 산간 지역
            </S.ShippingOptionSelectText>
          </S.ShippingOptionSelectRow>
        </S.ShippingOptionBox>
        <OrderPriceSummary
          orderPrice={orderPrice}
          discountAmount={discountAmount}
          deliveryFee={deliveryFee}
          paymentPrice={paymentPrice}
        />
        <FooterButton onClick={moveToPaymentCheck}>결제하기</FooterButton>
        <CouponModal
          coupons={coupons}
          couponAppliedIds={appliedCouponIds}
          applyCoupons={applyCouponIds}
        />
      </S.Container>
    </Modal>
  );
}

export default OrderCheckContents;
