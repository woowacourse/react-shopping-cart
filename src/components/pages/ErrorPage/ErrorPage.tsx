import { Link } from 'react-router-dom';

import * as Styled from './ErrorPage.styled';

const ErrorPage = () => {
  return (
    <Styled.ErrorPage>
      <Styled.ErrorSection>
        <h1>페이지를 찾을 수 없습니다 😢</h1>
        <p>페이지 주소가 올바른지 확인하거나 새로고침해 주세요!</p>
        <Link to="/">
          <Styled.HomeEntryButton type="button">초기화면으로 돌아가기</Styled.HomeEntryButton>
        </Link>
      </Styled.ErrorSection>
    </Styled.ErrorPage>
  );
};

export default ErrorPage;
