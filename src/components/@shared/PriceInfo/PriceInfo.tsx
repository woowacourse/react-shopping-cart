import { formatCurrency } from "../../../utils/formatters";
import * as S from "./PriceInfo.styles";

interface Props {
  label: string;
  price: number;
  isNegative?: boolean;
}

const PriceInfo = ({ label, price, isNegative = false }: Props) => {
  return (
    <S.PriceInfo>
      <S.Label>{label}</S.Label>
      <S.Price>
        {isNegative && "-"}
        {formatCurrency(price)}
      </S.Price>
    </S.PriceInfo>
  );
};

export default PriceInfo;
