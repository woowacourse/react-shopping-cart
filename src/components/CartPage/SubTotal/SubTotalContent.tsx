import styled from 'styled-components';
import TotalPrice from './TotalPrice';
import DeliveryPrice from './DeliveryPrice';
import CheckoutPrice from './CheckoutPrice';
import { Suspense } from 'react';

function Loading() {
  return <Text>0원</Text>;
}
export default function SubTotalContent() {
  return (
    <>
      <Paragraph>
        <Text>총 상품가격</Text>
        <Suspense fallback={<Loading />}>
          <TotalPrice />
        </Suspense>
      </Paragraph>
      <Paragraph>
        <Text>총 배송비</Text>
        <Suspense fallback={<Loading />}>
          <DeliveryPrice />
        </Suspense>
      </Paragraph>
      <Paragraph>
        <Text>총 주문금액</Text>
        <Suspense fallback={<Loading />}>
          <CheckoutPrice />
        </Suspense>
      </Paragraph>
    </>
  );
}

const Text = styled.span`
  ${({ theme }) => theme.fonts.subtotalContent};
`;

const Paragraph = styled.p`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 1.3rem 0;
`;
