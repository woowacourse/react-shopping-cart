import Checkbox from '../Checkbox/Checkbox';
import * as S from './styled';

const ShippingInfo = () => {
  return (
    <S.Container>
      <S.ShippingTitle>배송 정보</S.ShippingTitle>
      <S.ShippingCheckContainer>
        <Checkbox
          id="shipping-info-checkbox"
          isChecked={true}
          onClick={() => {
            console.log('ship');
          }}
        />
        <S.ShippingDescription>제주도 및 도서 산간 지역</S.ShippingDescription>
      </S.ShippingCheckContainer>
    </S.Container>
  );
};

export default ShippingInfo;
