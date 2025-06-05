import { useCartContext } from '../../../shared/context/useCartContext';
import { DELIVERY_FEE, DELIVERY_FEE_THRESHOLD } from '../constants/orderPriceSummary';
import * as S from './OrderPriceSummary.styles';
import SelectInput from '../../../shared/ui/SelectInput';

export default function OrderPriceSummary({ useCoupon = false }: { useCoupon?: boolean }) {
  const { selectedCartItems } = useCartContext();

  const totalPrice = selectedCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = totalPrice >= DELIVERY_FEE_THRESHOLD ? 0 : DELIVERY_FEE;
  const totalPurchasePrice = totalPrice + deliveryFee;

  return (
    <S.OrderPriceSummaryContainer>
      {useCoupon && (
        <>
          <S.DeliveryFeeHeaderLabel>배송 정보</S.DeliveryFeeHeaderLabel>
          <S.SuburbExtraFeeContainer>
            <SelectInput type='checkbox' />
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
          <S.PriceBox>-0원</S.PriceBox>
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
