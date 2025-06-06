import * as S from "./Shipping.styles";
import CheckBox from "../../common/CheckBox/CheckBox";

export default function Shipping() {
  return (
    <section>
      <S.Title>배송 정보</S.Title>
      <S.CheckWrapper>
        <CheckBox type="checkbox" />
        <S.Option>제주도 및 도서 산간 지역</S.Option>
      </S.CheckWrapper>
      <></>
    </section>
  );
}
