import { useRecoilState } from 'recoil';

import { selectedDeliveryInfoListSelector } from '../../../recoil/DeliveryInfo/selectors/selectedDeliveryInfoListSelector';
import CheckButton from '../../Button/CheckButton/CheckButton';
import * as S from './DeliveryInfoContainer.style';

import type { DeliveryInfo } from '../../../types/DeliveryInfo.type';

interface DeliveryInfoContainerProps {
  item: DeliveryInfo;
}

function DeliveryInfoContainer({ item }: DeliveryInfoContainerProps) {
  const [isSelected, setIsSelected] = useRecoilState(selectedDeliveryInfoListSelector(item));

  const handleIsSelected = () => setIsSelected(isSelected);

  return (
    <S.CheckListItemContainer key={item.title}>
      <CheckButton isChecked={isSelected} onClick={handleIsSelected} />
      <S.CheckListContent>{item.title}</S.CheckListContent>
    </S.CheckListItemContainer>
  );
}

export default DeliveryInfoContainer;
