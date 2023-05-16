import { Link } from 'react-router-dom';

import {
  StyledErrorPage,
  StyledErrorSection,
} from '@pages/ErrorPage/ErrorPage.styled';
import * as Text from '@components/commons/Text/Text';
import { Button as MoveToHome } from '@components/commons/Button/Button';

const ErrorPage = () => {
  return (
    <StyledErrorPage>
      <StyledErrorSection>
        <Text.Title>페이지를 찾을 수 없습니다 😢</Text.Title>
        <Text.Paragraph>올바른 주소인지 확인해 주세요</Text.Paragraph>
        <Link to="/">
          <MoveToHome
            padding="20px"
            borderRadius="8px"
            backgroundColor="#04c09e"
            type="button"
          >
            <Text.Paragraph color="white">
              초기 화면으로 돌아가기
            </Text.Paragraph>
          </MoveToHome>
        </Link>
      </StyledErrorSection>
    </StyledErrorPage>
  );
};

export default ErrorPage;
