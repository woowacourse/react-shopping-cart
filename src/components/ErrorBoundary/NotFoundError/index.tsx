import { FC } from 'react';
import { useHistory } from 'react-router';
import { ErrorContainer, RedirectButton, BaeDaleeImage, ErrorText } from '../styles';

const NotFoundError: FC = () => {
  const history = useHistory();

  return (
    <ErrorContainer>
      <ErrorText>해당 페이지를 찾을 수 없습니다.</ErrorText>
      <ErrorText>페이지 url을 확인해주세요.</ErrorText>
      <RedirectButton onClick={() => history.goBack()}>돌아가기</RedirectButton>
      <BaeDaleeImage />
    </ErrorContainer>
  );
};

export default NotFoundError;
