import { useNavigate } from 'react-router-dom';

import { container, homeButton } from './ErrorFallback.styled';

interface ErrorFallbackProps {
  error: Error;
}

const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  const navigate = useNavigate();

  const handleClickHomeButton = () => {
    navigate('/');
  };

  return (
    <div css={container}>
      <div>에러가 발생했습니다.</div>
      <div>에러 : {error.message}</div>
      <button css={homeButton} onClick={handleClickHomeButton}>
        홈화면으로 가기
      </button>
    </div>
  );
};

export default ErrorFallback;
