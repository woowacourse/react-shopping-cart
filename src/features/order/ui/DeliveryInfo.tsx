import * as S from './DeliveryInfo.styles';
import SelectInput from '../../../shared/ui/SelectInput';
import { useOrderContext } from '../context/useOrderContext';

export default function DeliveryInfo() {
  const { isRemoteArea, updateRemoteArea } = useOrderContext();

  const handleUpdateRemoteArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateRemoteArea(e.target.checked);
  };

  return (
    <S.DeliveryInfoContainer>
      <h2>배송 정보</h2>
      <S.SelectInputContainer>
        <SelectInput onChange={handleUpdateRemoteArea} checked={isRemoteArea} />
        <span>제주도 및 도서 산간 지역</span>
      </S.SelectInputContainer>
    </S.DeliveryInfoContainer>
  );
}
