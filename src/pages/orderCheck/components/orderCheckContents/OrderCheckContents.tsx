import { FooterButton, Loading, SelectBox } from '@/components/common';
import BorderButton from '@/components/common/borderButton/BorderButton';
import { CartItemType } from '@/components/features/cart/types';
import { calculateOrderPrice } from '@/components/features/cart/utils/cartCalculations';
import { getCoupons } from '@/components/features/coupon/api/getCoupons';
import CouponModal from '@/components/features/coupon/couponModal/CouponModal';
import OrderCheckTitle from '@/components/features/orderCheck/orderCheckTitle/OrderCheckTitle';
import OrderItem from '@/components/features/orderCheck/orderItem/OrderItem';
import OrderPriceSummary from '@/components/features/orderCheck/orderPriceSummary/OrderPriceSummary';
import { useJaeO } from '@/shared/data/useJaeO';
import { Modal } from '@jae-o/modal-component-module';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import * as S from './OrderCheckContents.styles';
import Coupon from '@/components/features/coupon/models/coupon';

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
    () => (coupons ? coupons.map((coupon) => new Coupon(coupon)) : []),
    [coupons]
  );
  const orderPrice = calculateOrderPrice(orderItems);
  const discountAmount = couponModels
    .filter((item) => couponSelectedIds.includes(item.data.id))
    .reduce(
      (acc, item) => acc + item.calculateDiscount(orderItems, isRemoteArea),
      0
    );

  const toggleSelect = (couponId: number) => {
    setCouponSelectedIds((prev) => {
      if (prev.includes(couponId)) {
        return prev.filter((id) => id !== couponId);
      }
      if (prev.length < 2) {
        return [...prev, couponId];
      }

      return prev;
    });
  };

  const toggleRemoteArea = () => {
    setIsRemoteArea((prev) => !prev);
  };

  const moveToPaymentCheck = () => {
    navigate('/payment-check', {
      state: {
        orderItemQuantity: orderItems.length,
        totalProductQuantity: orderItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        ),
        orderPrice,
      },
    });
  };

  useEffect(() => {
    const couponsSortedByDiscountAmount = [...couponModels]
      .sort(
        (a, b) =>
          b.calculateDiscount(orderItems, isRemoteArea) -
          a.calculateDiscount(orderItems, isRemoteArea)
      )
      .slice(0, 2);
    setCouponSelectedIds(
      couponsSortedByDiscountAmount.map((coupon) => coupon.data.id)
    );
  }, [couponModels, isRemoteArea, orderItems]);

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
        <OrderPriceSummary value={orderPrice} discountAmount={discountAmount} />
        <FooterButton onClick={moveToPaymentCheck}>결제하기</FooterButton>
        <CouponModal
          coupons={couponModels}
          orderPrice={orderPrice}
          couponSelectedIds={couponSelectedIds}
          toggleSelect={toggleSelect}
        />
      </S.Container>
    </Modal>
  );
}

export default OrderCheckContents;
