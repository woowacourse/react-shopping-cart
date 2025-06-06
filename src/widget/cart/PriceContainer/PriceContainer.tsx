import * as S from './PriceContainer.styled';
import InfoIcon from '@assets/icons/info.svg';
import { FREE_DELIVERY_LIMIT } from '@/features/cart/utils/cartPriceCalculator';
import { PriceBox } from '@/shared/components/PriceBox';

interface PriceContainerProps {
  orderPrice: number;
  deliveryFee: number;
  orderTotalPrice: number;
}

export default function PriceContainer({
  orderPrice,
  deliveryFee,
  orderTotalPrice,
}: PriceContainerProps) {
  const orderItems = [
    { title: '주문 금액', price: orderPrice, testId: 'order-price' },
    { title: '배송비', price: deliveryFee, testId: 'delivery-price' },
  ];

  const totalItems = [{ title: '총 결제 금액', price: orderTotalPrice, testId: 'payment-price' }];

  return (
    <S.Container>
      <S.InfoContainer>
        <S.InfoIcon src={InfoIcon} alt="배송비 무료 안내" />
        <S.InfoText>
          총 주문 금액이 {FREE_DELIVERY_LIMIT.toLocaleString()}원 이상일 경우 무료 배송됩니다.
        </S.InfoText>
      </S.InfoContainer>
      <PriceBox items={orderItems} />
      <PriceBox items={totalItems} />
    </S.Container>
  );
}
