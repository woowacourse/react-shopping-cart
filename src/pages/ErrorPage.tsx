import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Icon from '../assets/images/icon.png';

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  margin-top: 60px;
`;

const Cart = styled.img`
  width: 200px;
`;

const Title = styled.h1`
  font-size: 32px;
`;

const Button = styled.button`
  padding: 24px 48px;
  background: #333333;
  font-size: 24px;
  color: white;
`;

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Content>
      <Cart src={Icon} alt="아이콘" />

      <Title>찾으시는 페이지가 없는 것 같아요! 🥲</Title>

      <Button onClick={() => navigate('/')}>홈으로 가기</Button>
    </Content>
  );
};

export default ErrorPage;
