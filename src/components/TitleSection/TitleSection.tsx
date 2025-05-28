import CheckBox from "../CheckBox/CheckBox";
import * as S from "./TitleSection.styled";

function TitleSection() {
  return (
    <div>
      <S.Title>장바구니</S.Title>
      <S.Description>현재 2종류의 상품이 담겨있습니다.</S.Description>

      <div>
        <CheckBox text={"전체선택"} />
      </div>
    </div>
  );
}

export default TitleSection;
