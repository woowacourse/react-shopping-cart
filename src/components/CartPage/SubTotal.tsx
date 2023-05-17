import styled from 'styled-components';

export default function SubTotal() {
  return (
    <SubTotalContainer>
      <Title>결제예상금액</Title>
      <Paragraph>
        <Text>총 상품가격</Text>
        <Text>???원</Text>
      </Paragraph>
      <Paragraph>
        <Text>총 배송비</Text>
        <Text>???원</Text>
      </Paragraph>
      <Paragraph>
        <Text>총 주문금액</Text>
        <Text>???원</Text>
      </Paragraph>
      <button>주문하기</button>
    </SubTotalContainer>
  );
}

const SubTotalContainer = styled.div`
  border: 1px solid #ddd;
  width: 35%;
`;

const Title = styled.h3`
  ${({ theme }) => theme.fonts.cartHeading};
  padding: 1rem 2rem;
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray100};
`;

const Text = styled.span`
  ${({ theme }) => theme.fonts.subtotalContent};
`;

const Paragraph = styled.p`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  width: 100%;
`;
