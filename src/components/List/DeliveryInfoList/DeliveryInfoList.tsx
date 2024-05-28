import { DELIVERY_INFOS } from '../../../constants/DELIVERY_INFOS';
import DeliveryInfoContainer from '../../Container/DeliveryInfoContainer/DeliveryInfoContainer';
import * as S from './DeliveryInfoList.style';

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

export default DeliveryInfoList;
