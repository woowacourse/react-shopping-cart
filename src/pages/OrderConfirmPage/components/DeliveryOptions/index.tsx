import * as S from "./DeliveryOptions.styled";
import CheckBox from "../../../../components/common/CheckBox";
import Text from "../../../../components/common/Text";

interface DeliveryOptionsProps {
  isIsolatedAreaSelected: boolean;
  onToggleIsolatedArea: () => void;
}

const DeliveryOptions = ({ isIsolatedAreaSelected, onToggleIsolatedArea }: DeliveryOptionsProps) => {
  return (
    <S.DeliveryInformation>
      <Text variant="title-2">배송 정보</Text>
      <CheckBox isChecked={isIsolatedAreaSelected} onClick={onToggleIsolatedArea}>
        제주도 및 도서 산간 지역
      </CheckBox>
    </S.DeliveryInformation>
  );
};

export default DeliveryOptions;
