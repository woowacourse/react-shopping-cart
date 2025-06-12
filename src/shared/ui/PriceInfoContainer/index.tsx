import * as S from './PriceInfoContainer.styled';
import { ReactNode } from 'react';
import Description from '../Description';

interface PriceInfoContainerProps {
  children: ReactNode;
  freeDeliveryLimit: number;
}

export default function PriceInfoContainer({
  children,
  freeDeliveryLimit,
}: PriceInfoContainerProps) {
  const description = `총 주문 금액이 ${freeDeliveryLimit.toLocaleString()}원 이상일 경우 무료 배송됩니다.`;

  return (
    <S.Container>
      <Description description={description} />
      {children}
    </S.Container>
  );
}
