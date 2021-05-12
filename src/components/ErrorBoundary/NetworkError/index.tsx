import { BaeDaleeImage, ErrorText, HomeButton, NetworkErrorContainer } from './styles';

const NetworkError = () => {
  return (
    <NetworkErrorContainer>
      <ErrorText>네트워크 오류가 발생하였습니다.</ErrorText>
      <ErrorText>잠시후 다시 시도해주세요.</ErrorText>
      <HomeButton onClick={() => window.location.reload()}>새로고침</HomeButton>
      <BaeDaleeImage />
    </NetworkErrorContainer>
  );
};

export default NetworkError;
