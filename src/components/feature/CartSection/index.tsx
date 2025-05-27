import * as S from "./CartSection.styles";
import Card from "./CartProducts/Card";
import Header from "./Header";
import CheckBox from "../../common/CheckBox";
import PriceSection from "./PriceSection";
import Button from "../../common/Button";
import { css } from "@emotion/react";

const CartSection = () => {
  return (
    <S.Container>
      <Header />
      <CheckBox label="전체 선택" isChecked={false} onChange={() => {}} />
      <S.CartList>
        <Card />
        <Card /> <Card /> <Card />
      </S.CartList>

      <PriceSection />
      <Button
        title="주문 확인"
        onClick={() => {}}
        css={css`
          padding: 24px 0;
          background-color: #000;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
        `}
      />
    </S.Container>
  );
};

export default CartSection;
