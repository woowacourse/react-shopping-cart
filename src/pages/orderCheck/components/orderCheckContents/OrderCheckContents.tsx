import { FooterButton, Loading, SelectBox } from '@/components/common';
import BorderButton from '@/components/common/borderButton/BorderButton';
import { CartItemType } from '@/components/features/cart/types';
import { calculateOrderPrice } from '@/components/features/cart/utils/cartCalculations';
import { getCoupons } from '@/components/features/coupon/api/getCoupons';
import CouponModal from '@/components/features/coupon/couponModal/CouponModal';
import Coupon from '@/components/features/coupon/models/coupon';
import OrderCheckTitle from '@/components/features/orderCheck/orderCheckTitle/OrderCheckTitle';
import OrderItem from '@/components/features/orderCheck/orderItem/OrderItem';
import OrderPriceSummary from '@/components/features/orderCheck/orderPriceSummary/OrderPriceSummary';
import { useJaeO } from '@/shared/data/useJaeO';
import { Modal } from '@jae-o/modal-component-module';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import * as S from './OrderCheckContents.styles';
import { calculateDeliveryFee } from '@/components/features/cart/utils/calculateDeliveryFee';
import { ROUTE } from '@/shared/constants/route';

interface OrderCheckContentsProps {
  orderItems: CartItemType[];
}

function OrderCheckContents({ orderItems }: OrderCheckContentsProps) {
  const [isRemoteArea, setIsRemoteArea] = useState(false);
  const navigate = useNavigate();
  const { data: coupons } = useJaeO({
    fetchKey: 'coupons',
    fetchFn: getCoupons,
  });
  const [couponSelectedIds, setCouponSelectedIds] = useState<number[]>([]);

  const couponModels = useMemo(
    () =>
      coupons
        ? coupons.map((coupon) => new Coupon(coupon, orderItems, false))
        : [],
    [coupons, orderItems]
  );
  const orderPrice = calculateOrderPrice(orderItems);
  const discountAmount = couponModels
    .filter((item) => couponSelectedIds.includes(item.data.id))
    .reduce((acc, item) => acc + item.discountAmount, 0);
  const deliveryFee = calculateDeliveryFee(orderPrice, isRemoteArea);
  const paymentPrice = orderPrice - discountAmount + deliveryFee;

  const toggleRemoteArea = () => {
    couponModels.forEach((coupon) =>
      coupon.updateDiscountAmount(orderItems, !isRemoteArea)
    );
    setIsRemoteArea((prev) => !prev);
  };

  const applyCoupons = (couponIds: number[]) => {
    setCouponSelectedIds(couponIds);
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
    if (couponModels.length === 0) return;

    const couponsSortedByDiscountAmount = [...couponModels]
      .sort((a, b) => b.discountAmount - a.discountAmount)
      .slice(0, 2)
      .filter((coupon) => !coupon.disable);
    setCouponSelectedIds(
      couponsSortedByDiscountAmount.map((coupon) => coupon.data.id)
    );
  }, [couponModels, orderItems]);

  if (!coupons) return <Loading />;

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
          coupons={couponModels}
          couponSelectedIds={couponSelectedIds}
          applyCoupons={applyCoupons}
        />
      </S.Container>
    </Modal>
  );
}

export default OrderCheckContents;
