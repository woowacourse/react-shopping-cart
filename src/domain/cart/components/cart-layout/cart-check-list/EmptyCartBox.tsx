import styled from "@emotion/styled";

function EmptyCartBox() {
  return (
    <Container>
      <EmptyCartImage src="./assets/icons/DeleteCart.svg" />
      <EmptyCartText>장바구니에 담긴 상품이 없습니다.</EmptyCartText>
    </Container>
  );
}

export default EmptyCartBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: 32px;
`;

const EmptyCartImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  opacity: 0.3;
`;

const EmptyCartText = styled.p`
  width: 100%;
  color: grey;
`;
