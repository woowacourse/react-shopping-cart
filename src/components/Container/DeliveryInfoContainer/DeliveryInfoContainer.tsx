import { useRecoilState } from 'recoil';
import { selectedDeliveryInfoListSelector } from '../../DeliveryInfoList/recoil/selectors/selectedDeliveryInfoListSelector';
import { DeliveryInfo } from '../../../types/DeliveryInfo.type';
import * as S from './DeliveryInfoContainer.style';
import CheckButton from '../../Button/CheckButton/CheckButton';

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
