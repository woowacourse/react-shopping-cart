import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Flex from '../components/utils/Flex';
import Image from '../components/utils/Image';
import Button from '../components/utils/Button';

import notFoundImg from '../asset/not-found.jpeg';
import { COLOR } from '../constant';

const ContentWrapper = styled.section`
  margin: 25px;
  text-align: center;
`;

const ContentText = styled.p`
  font-size: 24px;
  line-height: 36px;
  color: ${COLOR.CYAN[600]};
  margin: 0;
  padding: 0;
`;

const LinkStyle = styled(NavLink)`
  text-decoration: none;

  &:visited {
    color: ${COLOR.WHITE[400]};
    font-weight: 700;
  }
`;

const FlexStyle = css`
  width: 100%;
  height: 80vh;
`;

const ButtonStyle = css`
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
        <Button
          width="117px"
          height="50px"
          color={COLOR.WHITE[400]}
          border="none"
          backgroundColor={COLOR.CYAN[400]}
          fontSize="18px"
          css={ButtonStyle}
        >
          <LinkStyle to="/">쇼핑하러 가기</LinkStyle>
        </Button>
      </ContentWrapper>
    </Flex>
  );
}

export default NotFoundPage;
