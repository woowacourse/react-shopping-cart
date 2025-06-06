import * as S from "./DeliveryInformation.styled";
import CheckBox from "../../common/CheckBox";
import Text from "../../common/Text";

interface DeliveryInformationProps {
  isRemoteArea: boolean;
  toggleRemoteArea: () => void;
}

const DeliveryInformation = ({ isRemoteArea, toggleRemoteArea }: DeliveryInformationProps) => {
  return (
    <S.Container>
      <Text variant="title-2">배송 정보</Text>
      <S.Wrap>
        <CheckBox isChecked={isRemoteArea} onClick={toggleRemoteArea} />
        <Text variant="body-3">제주도 및 도서 산간 지역</Text>
      </S.Wrap>
    </S.Container>
  );
};

export default DeliveryInformation;
