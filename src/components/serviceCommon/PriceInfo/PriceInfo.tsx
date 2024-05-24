import * as S from './styled';

interface PriceInfoProps {
  title: string;
  price: number;
}

const PriceInfo = ({ title, price }: PriceInfoProps) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Price>{price.toLocaleString()}원</S.Price>
    </S.Container>
  );
};

export default PriceInfo;
