import ROUTE_PATH from 'Router';
import { useRouteError, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function ErrorPage() {
  const response = useRouteError();
  const navigate = useNavigate();

  const goBackPage = () => {
    navigate(ROUTE_PATH.root);
  };

  return (
    <Container>
      <ErrorContainer>
        <h1>ERROR: {response.statusText}</h1>
        <p>예상치 못한 오류가 발생했어요🥲</p>
        <p>
          <i>{response.error.message}</i>
        </p>
        <GoBackButton onClick={goBackPage}>홈으로 이동하기</GoBackButton>
      </ErrorContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ErrorContainer = styled.div``;

const GoBackButton = styled.button``;
