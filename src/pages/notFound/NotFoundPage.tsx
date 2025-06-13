import { ROUTE } from '@/shared';
import { useNavigate } from 'react-router';
import styled from '@emotion/styled';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTE.home);
  };

  return (
    <Container>
      <Title>Page Not Found</Title>
      <HomeButton onClick={handleGoHome}>메인 페이지로</HomeButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: black;
`;

const HomeButton = styled.button`
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 700;
  background-color: black;
  color: white;
  border-radius: 4px;
`;

export default NotFoundPage;
