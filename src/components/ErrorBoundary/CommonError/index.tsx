import { FC } from 'react';
import { BaeDaleeImage, ErrorContainer, ErrorText, RedirectButton } from '../styles';

const CommonError: FC = () => (
  <ErrorContainer>
    <ErrorText>오류가 발생하였습니다.</ErrorText>
    <ErrorText>잠시후 다시 시도해주세요.</ErrorText>
    <RedirectButton onClick={() => window.location.reload()}>새로고침</RedirectButton>
    <BaeDaleeImage />
  </ErrorContainer>
);

export default CommonError;
