import { ReactNode } from "react";

import * as S from "./styled";

interface PriceInfoMainProps {
  children: ReactNode;
}
interface PriceInfoRowProps {
  title: string;
  price: number;
  isDiscount?: boolean;
}

const Row = ({ title, price, isDiscount = false }: PriceInfoRowProps) => {
  return (
    <S.PriceRow>
      <S.PriceTitle>{title}</S.PriceTitle>
      <S.PriceNumber>
        {isDiscount && "-"}
        {price.toLocaleString("ko-KR")}원
      </S.PriceNumber>
    </S.PriceRow>
  );
};

const PriceInfoMain = ({ children }: PriceInfoMainProps) => {
  return (
    <S.Container>
      <S.PriceGroup>{children}</S.PriceGroup>
    </S.Container>
  );
};

const PriceInfo = Object.assign(PriceInfoMain, {
  Row: Row,
});

export default PriceInfo;
