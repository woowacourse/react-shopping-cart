import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ShoppingCart() {
  return <Content style={{ fontSize: '50px' }}>장바구니 페이지</Content>;
}

export default ShoppingCart;
