import styled from '@emotion/styled';

interface OrderPageInfoProps {
  typeCount: number;
  totalCount: number;
}

const OrderPageInfo = ({ typeCount, totalCount }: OrderPageInfoProps) => (
  <PageInfo>
    <InfoTitle>주문 확인</InfoTitle>
    <Description
      aria-label={`총 ${typeCount}종류의 상품 ${totalCount}개를 주문합니다.`}
    >
      <p>
        총 {typeCount}종류의 상품 {totalCount}개를 주문합니다.
      </p>
      <p>최종 결제 금액을 확인해 주세요.</p>
    </Description>
  </PageInfo>
);

export default OrderPageInfo;

const PageInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
`;

const InfoTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Description = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
`;
