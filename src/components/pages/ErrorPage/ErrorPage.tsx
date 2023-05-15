import { Link } from 'react-router-dom';

import {
  StyledErrorPage,
  StyledErrorSection,
} from '@pages/ErrorPage/ErrorPage.styled';
import Heading from '@components/commons/Heading/Heading';
import Text from '@components/commons/Text/Text';
import Button from '@components/commons/Button/Button';

const ErrorPage = () => {
  return (
    <StyledErrorPage>
      <StyledErrorSection>
        <Heading text="페이지를 찾을 수 없습니다 😢" fontSize="32px" />
        <Text text="올바른 주소인지 확인해 주세요" fontSize="20px" />
        <Link to="/">
          <Button
            padding="20px"
            borderRadius="8px"
            backgroundColor="#04c09e"
            type="button"
          >
            <Text text="초기 화면으로 돌아가기" color="white" fontSize="24px" />
          </Button>
        </Link>
      </StyledErrorSection>
    </StyledErrorPage>
  );
};

export default ErrorPage;
