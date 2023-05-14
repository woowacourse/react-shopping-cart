import { Link } from 'react-router-dom';

import {
  StyledErrorPage,
  StyledErrorSection,
} from '@pages/ErrorPage/ErrorPage.styled';
import Button from '@components/commons/Button/Button';

const ErrorPage = () => {
  return (
    <StyledErrorPage>
      <StyledErrorSection>
        <h1>페이지를 찾을 수 없습니다 😢</h1>
        <p>올바른 주소인지 확인해 주세요</p>
        <Link to="/">
          <Button
            padding="20px"
            borderRadius="8px"
            backgroundColor="#04c09e"
            color="white"
            fontSize="20px"
            type="button"
          >
            초기화면으로 돌아가기
          </Button>
        </Link>
      </StyledErrorSection>
    </StyledErrorPage>
  );
};

export default ErrorPage;
