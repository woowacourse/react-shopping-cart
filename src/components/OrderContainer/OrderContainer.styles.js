import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #aaaaaa;
  color: #333333;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  padding: 0 40px;
  border-bottom: 1px solid #aaaaaa;
  background-color: #f6f6f6;
`;

const ProductList = styled.div`
  & > * {
    padding: 40px 25px;
    background-color: white;
  }
  & > *:not(:last-child) {
    border-bottom: 1px solid #aaaaaa;
  }
`;

export { Container, Header, ProductList };
