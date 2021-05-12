import { useHistory } from 'react-router';
import { BaeDaleeImage, ErrorText, HomeButton, CommonErrorContainer } from './styles';

const CommonError = () => {
  return (
    <CommonErrorContainer>
      <ErrorText>오류가 발생하였습니다.</ErrorText>
      <ErrorText>잠시후 다시 시도해주세요.</ErrorText>
      <HomeButton onClick={() => window.location.reload()}>새로고침</HomeButton>
      <BaeDaleeImage />
    </CommonErrorContainer>
  );
};

export default CommonError;
