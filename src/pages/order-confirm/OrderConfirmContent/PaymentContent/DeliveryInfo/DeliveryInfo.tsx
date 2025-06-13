import CheckBox from "@/shared/components/CheckBox/CheckBox";
import * as S from "./DeliveryInfo.styled";

type DeliveryInfoProps = {
  isChecked: boolean;
  onClick: () => void;
};

export default function DeliveryInfo({
  isChecked,
  onClick,
}: DeliveryInfoProps) {
  return (
    <S.Container>
      <S.Title>배송 정보</S.Title>
      <CheckBox
        isChecked={isChecked}
        onClick={onClick}
        aria-label="제주도 및 도서 산간 지역"
      >
        제주도 및 도서 산간 지역
      </CheckBox>
    </S.Container>
  );
}
