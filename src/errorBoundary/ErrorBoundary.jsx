import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PATH } from '../constants/path';
import { Button } from '../components';

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
`;

const ErrorMessage = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Container role="alert">
      <ErrorMessage>
        <p>{error.message}</p>
        <p>문제가 지속되면 관리자에게 문의해주세요.</p>
      </ErrorMessage>
      <Link to={PATH.HOME}>
        <Button onClick={resetErrorBoundary}>홈으로 돌아가기</Button>
      </Link>
    </Container>
  );
};
