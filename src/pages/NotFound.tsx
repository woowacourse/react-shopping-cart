import { FlexCenter, FlexColumn } from '@/style/common.style';

import Header from '@/components/Header';
import NotFound404 from '@/assets/NotFound404.avif';
import { StyledFixedTop } from '@/style/styledBox.style';
import styled from '@emotion/styled';

const NotFound = () => {
  return (
    <>
      <StyledFixedTop>
        <Header navigatePath="/" />
      </StyledFixedTop>
      <StyledCenterBox>
        <Img src={NotFound404} alt="Not Found" />
        <StyledTextTitle>NotFound</StyledTextTitle>
        <StyledTextBody>죄송합니다. 페이지를 찾을 수 없습니다.</StyledTextBody>
      </StyledCenterBox>
    </>
  );
};
export default NotFound;

const StyledCenterBox = styled.div`
  ${FlexColumn}
  ${FlexCenter}
  height: 100vh;
`;

const Img = styled.img`
  width: 80%;
`;

const StyledTextTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

const StyledTextBody = styled.p`
  font-size: 16px;
  margin: 0;
`;
