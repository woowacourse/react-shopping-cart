import { DELIVERY_INFOS } from '../../constants/DELIVERY_INFOS';
import CheckButton from '../Button/CheckButton/CheckButton';
import * as S from './DeliveryInfoContainer.style';

function DeliveryInfoContainer() {
  return (
    <S.Layout>
      <S.Title>배송 정보</S.Title>
      <S.CheckListContainer>
        {Object.values(DELIVERY_INFOS).map((option) => (
          <S.CheckListItemContainer>
            <CheckButton isChecked={true} />
            <S.CheckListContent>{option.title}</S.CheckListContent>
          </S.CheckListItemContainer>
        ))}
      </S.CheckListContainer>
    </S.Layout>
  );
}

export default DeliveryInfoContainer;
