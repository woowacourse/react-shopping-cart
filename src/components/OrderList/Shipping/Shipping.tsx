import * as S from "./Shipping.styles";
import CheckBox from "../../common/CheckBox/CheckBox";

interface ShippingProps {
  isRemote: boolean;
  onRemoteChange: (checked: boolean) => void;
}

export default function Shipping({ isRemote, onRemoteChange }: ShippingProps) {
  return (
    <section>
      <S.Title>배송 정보</S.Title>
      <S.CheckWrapper>
        <CheckBox
          type="checkbox"
          checked={isRemote}
          onChange={(e) => onRemoteChange(e.target.checked)}
        />
        <S.Option>제주도 및 도서 산간 지역</S.Option>
      </S.CheckWrapper>
    </section>
  );
}
