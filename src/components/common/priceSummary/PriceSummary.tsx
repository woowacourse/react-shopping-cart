import { Separator } from '../separator';
import * as S from './PriceSummary.styles';

type PriceItem = {
  label: string;
  amount: number;
  isDiscount?: boolean;
};

interface PriceSummaryProps {
  items: PriceItem[];
  total: PriceItem;
  notice?: string;
}

function PriceSummary({ items, total, notice }: PriceSummaryProps) {
  return (
    <S.Container>
      {notice && (
        <S.NoticeBox>
          <img src="./assets/Notification.svg" alt="알림" />
          <S.NoticeText>{notice}</S.NoticeText>
        </S.NoticeBox>
      )}

      <Separator />

      <S.IndividualPriceBox>
        {items.map(({ label, amount, isDiscount }) => (
          <S.PriceRow data-testid="price-row">
            <S.PriceLabel>{label}</S.PriceLabel>
            <S.PriceAmount>
              {isDiscount ? '-' : ''}
              {amount.toLocaleString()}원
            </S.PriceAmount>
          </S.PriceRow>
        ))}
      </S.IndividualPriceBox>

      <Separator />

      <S.PriceRow data-testid="price-row">
        <S.PriceLabel>{total.label}</S.PriceLabel>
        <S.PriceAmount>{total.amount.toLocaleString()}원</S.PriceAmount>
      </S.PriceRow>
    </S.Container>
  );
}

export default PriceSummary;
