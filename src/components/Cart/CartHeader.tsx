import styled from '@emotion/styled';

interface CartHeaderProps {
  description?: string | undefined;
}

function CartHeader({ description }: CartHeaderProps) {
  return (
    <Container>
      <Title>장바구니</Title>
      {description && <Description>{description}</Description>}
    </Container>
  );
}

export default CartHeader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 36px;
  gap: 12px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #000;
`;

const Description = styled.p`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  color: #0a0d13;
`;
