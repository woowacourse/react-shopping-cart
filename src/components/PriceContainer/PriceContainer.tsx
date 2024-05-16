import * as S from './PriceContainer.style';

interface PriceContainerProps {
  title: string;
  value: number;
}

function PriceContainer({ title, value }: PriceContainerProps) {
  return (
    <S.PriceContainer>
      <S.PriceTitle>{title}</S.PriceTitle>
      <S.PriceValue>{value.toLocaleString()}원</S.PriceValue>
    </S.PriceContainer>
  );
}

export default PriceContainer;
