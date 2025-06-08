import * as S from './DeliveryInfo.style';
import SelectInput from '../../../shared/ui/SelectInput';

interface DeliveryInfoProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DeliveryInfo({ onChange }: DeliveryInfoProps) {
  return (
    <S.DeliveryInfoContainer>
      <h2>배송 정보</h2>
      <S.SelectInputContainer>
        <SelectInput onChange={onChange} />
        <span>제주도 및 도서 산간 지역</span>
      </S.SelectInputContainer>
    </S.DeliveryInfoContainer>
  );
}
