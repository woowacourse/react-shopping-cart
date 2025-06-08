import styled from '@emotion/styled';
import CheckBox from './CheckBox';
import { useShippingContext } from '../contexts/Shipping/ShippingContext';

const DeliveryInfo = () => {
  const { isRemoteArea, setIsRemoteArea } = useShippingContext();

  const toggleRemoteArea = () => {
    setIsRemoteArea((prev) => !prev);
  };

  return (
    <S.Container>
      <S.title>배송 정보</S.title>
      <S.checkboxContainer>
        <CheckBox isChecked={isRemoteArea} onClick={toggleRemoteArea} />
        <span>제주도 및 도서 산간 지역</span>
      </S.checkboxContainer>
    </S.Container>
  );
};

export default DeliveryInfo;

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
  `,

  title: styled.p`
    font-size: 16px;
    font-weight: 700;
  `,

  checkboxContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
};
