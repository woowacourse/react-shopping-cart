import * as S from './styled';

interface PriceInfoProps {
  title: string;
  price: number;
  accent?: boolean;
}

const PriceInfo = ({ title, price, accent = false }: PriceInfoProps) => {
  return (
    <S.Container>
      <S.Title>
        {title} {accent && <S.Accent>최대 할인 적용</S.Accent>}
      </S.Title>
      <S.Price>{price.toLocaleString()}원</S.Price>
    </S.Container>
  );
};

export default PriceInfo;
