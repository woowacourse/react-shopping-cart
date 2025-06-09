import * as S from './OrderPriceItem.styles';

interface OrderPriceItemProps {
  title: string;
  price: number;
  'data-testid'?: string;
}

export default function OrderPriceItem({ title, price, 'data-testid': testId }: OrderPriceItemProps) {
  return (
    <S.TotalOrderPrice data-testid={testId}>
      {title}
      <S.PriceBox>{price.toLocaleString()}원</S.PriceBox>
    </S.TotalOrderPrice>
  );
}
