import { styled } from 'styled-components';

interface ErrorPageProps {
  error: Error;
  onReset: (...args: unknown[]) => void;
}

const ErrorPage = ({ error, onReset }: ErrorPageProps) => {
  const handleResetButtonClick = () => {
    onReset();
  };

  return (
    <Container role="alert">
      <ErrorMessage>⚠️ {error.message}</ErrorMessage>
      <ResetButton type="button" onClick={handleResetButtonClick}>
        <span>다시 시도하기</span>
      </ResetButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 20px;
  height: calc(100vh - 80px);
`;

const ErrorMessage = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 50px;
  background-color: #333;
  border-radius: 10px;
  font-weight: 500;
  color: #fff;
`;

export default ErrorPage;
