import { useCartContext } from '../../shared/context/useCartContext';
import { DELIVERY_FEE, DELIVERY_FEE_THRESHOLD } from '../../features/cart/constants/orderPriceSummary';
import * as S from './OrderPriceSummary.styles';
import SelectInput from '../../shared/ui/SelectInput';
import { useEffect } from 'react';

export default function OrderPriceSummary({ useCoupon = false }: { useCoupon?: boolean }) {
  const {
    selectedCartItems,
    totalDiscountPrice,
    deliveryFee,
    updateDeliveryFee,
    totalPurchasePrice,
    updateTotalPurchasePrice,
  } = useCartContext();

  const totalPrice = selectedCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  useEffect(() => {
    const newTotalPrice = selectedCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    if (newTotalPrice < DELIVERY_FEE_THRESHOLD) {
      updateDeliveryFee(DELIVERY_FEE);
    } else {
      updateDeliveryFee(0);
    }

    updateTotalPurchasePrice(newTotalPrice + deliveryFee);
  }, [selectedCartItems]);

  const handleSuburbExtraFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e?.target.checked;
    if (isChecked) {
      updateDeliveryFee(deliveryFee + DELIVERY_FEE);
    } else {
      updateDeliveryFee(Math.max(deliveryFee - DELIVERY_FEE, 0));
    }
  };

  return (
    <S.OrderPriceSummaryContainer>
      {useCoupon && (
        <>
          <S.DeliveryFeeHeaderLabel>배송 정보</S.DeliveryFeeHeaderLabel>
          <S.SuburbExtraFeeContainer>
            <SelectInput type='checkbox' onChange={handleSuburbExtraFeeChange} />
            <S.DeliveryFeeLabel>제주도 및 도서 산간 지역</S.DeliveryFeeLabel>
          </S.SuburbExtraFeeContainer>
        </>
      )}
      <S.DeliveryFeeLabel>
        <S.DeliveryFeeIcon src='./infoLabelIcon.svg' alt='Delivery Fee Label Icon' />총 주문 금액이 100,000원 이상일
        경우 무료 배송됩니다.
      </S.DeliveryFeeLabel>
      <S.TotalOrderPrice>
        주문 금액
        <S.PriceBox>{totalPrice.toLocaleString()}원</S.PriceBox>
      </S.TotalOrderPrice>
      {useCoupon && (
        <S.CouponDiscountAmount data-testid='coupon-discount-amount'>
          쿠폰 할인 금액
          <S.PriceBox>-{totalDiscountPrice}원</S.PriceBox>
        </S.CouponDiscountAmount>
      )}
      <S.DeliveryFee data-testid='delivery-fee'>
        배송비
        <S.PriceBox>{deliveryFee.toLocaleString()}원</S.PriceBox>
      </S.DeliveryFee>
      <S.TotalPurchasePrice data-testid='total-purchase-price'>
        총 결제 금액
        <S.PriceBox>{totalPurchasePrice.toLocaleString()}원</S.PriceBox>
      </S.TotalPurchasePrice>
    </S.OrderPriceSummaryContainer>
  );
}
