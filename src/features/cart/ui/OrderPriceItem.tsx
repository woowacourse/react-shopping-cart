import * as S from './OrderPriceItem.style';

interface OrderPriceItemProps {
  title: string;
  price: number;
}

export default function OrderPriceItem({ title, price }: OrderPriceItemProps) {
  return (
    <S.TotalOrderPrice>
      {title}
      <S.PriceBox>{price.toLocaleString()}원</S.PriceBox>
    </S.TotalOrderPrice>
  );
}
