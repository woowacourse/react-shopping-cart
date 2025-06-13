import {
  BorderButton,
  FooterButton,
  Loading,
  SelectBox,
} from '@/components/common';
import { ROUTE, useJaeO, useToggle } from '@/shared';
import { Modal } from '@jae-o/modal-component-module';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { OrderCheckTitle, OrderItem, OrderPriceSummary } from '..';
import {
  calculateDeliveryFee,
  calculateDiscountAmount,
  calculateOrderPrice,
  CartItemType,
} from '../../cart';
import {
  Coupon,
  CouponModal,
  CouponType,
  getCoupons,
  selectTopDiscountCoupons,
  useAppliedCoupons,
} from '../../coupon';
import * as S from './OrderCheckContents.styles';

interface OrderCheckContentsProps {
  orderItems: CartItemType[];
}

function OrderCheckContents({ orderItems }: OrderCheckContentsProps) {
  const navigate = useNavigate();
  const [isRemoteArea, toggleRemoteArea] = useToggle(false);
  const { data: coupons, isLoading } = useJaeO<CouponType[], Coupon[]>({
    fetchKey: 'coupons',
    fetchFn: getCoupons,
    convertFn: (data) =>
      data.map((coupon) => new Coupon(coupon, orderItems, false)),
  });
  const { appliedCouponIds, applyCouponIds, isCouponApplied } =
    useAppliedCoupons();

  const orderPrice = calculateOrderPrice(orderItems);
  const discountAmount = calculateDiscountAmount(coupons, isCouponApplied);
  const deliveryFee = calculateDeliveryFee(orderPrice, isRemoteArea);
  const paymentPrice = orderPrice - discountAmount + deliveryFee;

  const handleShippingOptionChange = () => {
    coupons?.forEach((coupon) =>
      coupon.updateDiscountAmount(orderItems, !isRemoteArea)
    );
    toggleRemoteArea();
  };
  const orderItemQuantity = orderItems.length;
  const totalProductQuantity = orderItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const moveToPaymentCheck = () => {
    navigate(ROUTE.paymentCheck, {
      state: {
        orderItemQuantity,
        totalProductQuantity,
        paymentPrice,
      },
    });
  };

  useEffect(() => {
    if (!coupons || coupons.length === 0) return;

    const topCoupons = selectTopDiscountCoupons(coupons);
    applyCouponIds(new Set(topCoupons.map((coupon) => coupon.data.id)));
  }, [applyCouponIds, coupons, orderItems]);

  if (isLoading || !coupons) return <Loading />;

  return (
    <Modal>
      <S.Container>
        <OrderCheckTitle
          orderItemQuantity={orderItemQuantity}
          totalProductQuantity={totalProductQuantity}
        />
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
              onClick={handleShippingOptionChange}
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
