import styled from '@emotion/styled';

export default function EmptyCartItemUI() {
  return <EmptyCartItemUIContainer>장바구니에 담은 상품이 없습니다.</EmptyCartItemUIContainer>;
}

const EmptyCartItemUIContainer = styled.section`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
