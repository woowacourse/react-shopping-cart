import { VFC } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useHistory } from 'react-router';
import { BaeDaleeImage, ErrorText, HomeButton, CommonErrorContainer } from './styles';

const AppErrorFallback: VFC<FallbackProps> = ({ resetErrorBoundary }) => {
  const history = useHistory();

  const replaceToHome = () => {
    history.replace('/');
    resetErrorBoundary();
  };

  return (
    <CommonErrorContainer>
      <ErrorText>오류가 발생하였습니다.</ErrorText>
      <ErrorText>잠시후 다시 시도해주세요.</ErrorText>
      <HomeButton onClick={replaceToHome}>홈으로</HomeButton>
      <BaeDaleeImage />
    </CommonErrorContainer>
  );
};

export default AppErrorFallback;
