import CheckBox from "@/shared/components/CheckBox/CheckBox";
import { useState } from "react";
import * as S from "./DeliveryInfo.styled";

export default function DeliveryInfo() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <S.Container>
      <S.Title>배송 정보</S.Title>
      <CheckBox
        isChecked={isChecked}
        onClick={() => setIsChecked((prev) => !prev)}
      >
        제주도 및 도서 산간 지역
      </CheckBox>
    </S.Container>
  );
}
