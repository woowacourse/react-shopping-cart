import * as S from './style';

import convertToLocaleAmount from '../../utils/convertToLocalePrice';

export interface SummaryItem {
  description: string;
  price: number;
}

interface Props {
  items: SummaryItem[];
}

export default function OrderSummary({ items }: Props) {
  const amount = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <S.OrderAmountContainer>
        {items.map((item) => {
          return (
            <S.AmountItem key={item.description}>
              <S.Title>{item.description}</S.Title>
              <S.Amount>{convertToLocaleAmount(item.price)}</S.Amount>
            </S.AmountItem>
          );
        })}
      </S.OrderAmountContainer>
      <S.AmountItem>
        <S.Title>총 결제 금액</S.Title>
        <S.Amount>{convertToLocaleAmount(amount)}</S.Amount>
      </S.AmountItem>
    </>
  );
}
