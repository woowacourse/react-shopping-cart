import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import FlexWrapper from 'components/@shared/FlexWrapper/FlexWrapper';

import surpriseBaedal from 'assets/baedal.png';
import PATH from 'constants/path';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <FlexWrapper flexDirection="column" gap="40px">
      <img src={surpriseBaedal}></img>
      <div>페이지를 찾을 수 없습니다</div>
      <Styled.HomeLinkButton onClick={() => navigate('/')}>
        홈으로
      </Styled.HomeLinkButton>
    </FlexWrapper>
  );
}

const Styled = {
  HomeLinkButton: styled.button`
    text-decoration: none;
  `,
};

export default NotFoundPage;
