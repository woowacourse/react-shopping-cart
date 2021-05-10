import React from 'react';
import { NavLink } from 'react-router-dom';

import Flex from '../components/utils/Flex';
import Image from '../components/utils/Image';
import Button from '../components/utils/Button';

import notFoundImg from '../asset/not-found.jpeg';

import styled, { css } from 'styled-components';

const FlexStyle = css`
  width: 100%;
  height: 80vh;
`;

const ContentWrapper = styled.div`
  margin: 25px;
  text-align: center;
`;

const ContentText = styled.p`
  font-size: 24px;
  line-height: 36px;
  color: #1c827f;
  margin: 0;
  padding: 0;
`;

const LinkStyle = styled(NavLink)`
  text-decoration: none;

  &:visited {
    color: #ffffff;
    font-weight: 700;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 10px;
  margin: 10px;
`;

function NotFoundPage() {
  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column" css={FlexStyle}>
      <Image src={notFoundImg} alt="없는 페이지를 나타내는 이미지" />
      <ContentWrapper>
        <ContentText>죄송합니다. 페이지가 없거나 오류가 발생하였습니다.</ContentText>
        <ContentText>현재 페이지가 존재하지 않거나, 현재 이용할 수 없는 페이지 입니다.</ContentText>
        <StyledButton
          width="130px"
          height="40px"
          color="#ffffff"
          border="none"
          backgroundColor="#2ac1bc"
          fontSize="18px"
        >
          <LinkStyle to="/">쇼핑하러 가기</LinkStyle>
        </StyledButton>
      </ContentWrapper>
    </Flex>
  );
}

export default NotFoundPage;
