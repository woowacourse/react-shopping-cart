import { Loading } from '@/components/common';
import styled from '@emotion/styled';

function CartLoadingPage() {
  return (
    <Container>
      <Loading />
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CartLoadingPage;
