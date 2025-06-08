import * as S from "./DeliveryInformation.styled";
import CheckBox from "../../../../shared/components/common/CheckBox";
import Text from "../../../../shared/components/common/Text";
import { useOrderContext } from "../../contexts/OrderContext";

const DeliveryInformation = () => {
  const { isRemoteArea, toggleRemoteArea } = useOrderContext();

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
