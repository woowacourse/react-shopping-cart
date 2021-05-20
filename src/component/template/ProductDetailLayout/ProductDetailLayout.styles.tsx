import styled from '@emotion/styled';
import Button from '../../atom/Button/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 400px;
`;

const Image = styled.img`
  width: 570px;
  height: 570px;
  object-fit: cover;
`;

const Title = styled.h2`
  font-size: 2rem;
  width: 570px;
  padding: 30px 20px;
  border-bottom: 1px solid black;
`;

const Price = styled.div`
  width: 570px;
  display: flex;
  font-size: 1.5rem;
  justify-content: space-between;
`;

const ShoppingCartButton = styled(Button)`
  width: 570px;
  height: 100px;
  font-size: 1.5rem;
  margin-top: 30px;
  background-color: #73675c;
`;

export { Container, Image, Title, Price, ShoppingCartButton };
