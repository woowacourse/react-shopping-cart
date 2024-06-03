import { useRecoilState } from 'recoil';
import CheckButton from '../common/CheckButton/CheckButton';
import { mountainousAreaState } from '../../recoil/cartItems';
import * as Styled from './style';

const DeliveryInfo = () => {
  const [mountainousArea, setMountainousArea] =
    useRecoilState(mountainousAreaState);

  const clickCheckButton = () => {
    setMountainousArea((prop) => !prop);
  };
  return (
    <Styled.DeliveryInfo>
      <Styled.DeliveryInfoTitle>배송 정보</Styled.DeliveryInfoTitle>
      <Styled.DeliveryContent>
        <CheckButton
          isSelected={mountainousArea}
          setIsSelected={clickCheckButton}
        />
        <Styled.DeliveryCaption>
          제주도 및 도서 산간 지역
        </Styled.DeliveryCaption>
      </Styled.DeliveryContent>
    </Styled.DeliveryInfo>
  );
};

export default DeliveryInfo;
