import { Link } from 'react-router-dom';

import {
  StyledErrorPage,
  StyledErrorSection,
  StyledHomeEntryButton,
} from '@pages/ErrorPage/ErrorPage.styled';

const ErrorPage = () => {
  return (
    <StyledErrorPage>
      <StyledErrorSection>
        <h1>페이지를 찾을 수 없습니다 😢</h1>
        <p>올바른 주소인지 확인해 주세요</p>
        <Link to="/">
          <StyledHomeEntryButton type="button">
            초기화면으로 돌아가기
          </StyledHomeEntryButton>
        </Link>
      </StyledErrorSection>
    </StyledErrorPage>
  );
};

export default ErrorPage;
