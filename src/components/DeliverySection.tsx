import styled from '@emotion/styled';
import CheckBox from '../components/CheckBox';

const DeliverySection = () => {
  return (
    <>
      <S.Title>배송 정보</S.Title>
      <S.Container data-testid="deliverySection">
        <CheckBox checked={false} onChange={() => {}} />
        <p>제주도 및 도서 산간 지역</p>
      </S.Container>
    </>
  );
};

export default DeliverySection;

const S = {
  Title: styled.p`
    font-size: 16px;
    font-weight: 700;
    margin: 16px 0;
  `,

  Container: styled.section`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
};
