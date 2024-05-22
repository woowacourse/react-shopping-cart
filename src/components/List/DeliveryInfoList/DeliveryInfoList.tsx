import { DELIVERY_INFOS } from '../../../constants/DELIVERY_INFOS';
import * as S from './DeliveryInfoList.style';
import DeliveryInfoContainer from '../../Container/DeliveryInfoContainer/DeliveryInfoContainer';

function DeliveryInfoList() {
  return (
    <S.Layout>
      <S.Title>배송 정보</S.Title>
      <S.CheckListContainer>
        {Object.values(DELIVERY_INFOS).map((option) => (
          <DeliveryInfoContainer key={option.title} item={option} />
        ))}
      </S.CheckListContainer>
    </S.Layout>
  );
}
// TODO: 선택 시 배송비 +3000 기능 구현하기
export default DeliveryInfoList;
