import styled from 'styled-components';

export default function TotalPrice({ totalAmount }) {
  return (
    <TotalPriceBox>
      <span>결제예상금액</span>
      <span>
        <span>{totalAmount.toLocaleString('ko-KR')}</span>원
      </span>
    </TotalPriceBox>
  );
}

const TotalPriceBox = styled.p`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
`;
