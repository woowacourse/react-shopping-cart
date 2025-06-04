import * as S from "./DeliveryInformation.styled";
import CheckBox from "../../common/CheckBox";
import Text from "../../common/Text";

interface DeliveryInformationProps {
  handleCheckChange: () => void;
}

const DeliveryInformation = ({ handleCheckChange }: DeliveryInformationProps) => {
  return (
    <S.Container>
      <Text variant="title-2">배송 정보</Text>
      <S.Wrap>
        <CheckBox isChecked={true} onClick={handleCheckChange} />
        <Text variant="body-3">제주도 및 도서 산간 지역</Text>
      </S.Wrap>
    </S.Container>
  );
};

export default DeliveryInformation;
