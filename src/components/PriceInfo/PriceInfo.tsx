import * as S from "./PriceInfo.styles";

interface Props {
  label: string;
  price: number;
}
const PriceInfo = ({ label, price }: Props) => {
  return (
    <S.PriceInfo>
      <S.Label>{label}</S.Label>
      <S.Price>{price.toLocaleString()}원</S.Price>
    </S.PriceInfo>
  );
};

export default PriceInfo;
