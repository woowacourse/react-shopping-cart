import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Flex from './utils/Flex';
import Image from './utils/Image';
import Button from './utils/Button';

import styled, { css } from 'styled-components';

const ContentWrapper = styled.section`
  margin: 25px;
  text-align: center;
`;

const ContentText = styled.p`
  font-size: 24px;
  line-height: 36px;
  color: #1c827f;
  margin: 0 0 10px;
  padding: 0;
`;

const LinkStyle = styled(NavLink)`
  text-decoration: none;

  &:visited {
    color: #ffffff;
    font-weight: 700;
  }
`;

const FlexStyle = css`
  width: 100%;
  height: 60vh;
`;

const ButtonStyle = css`
  border-radius: 10px;
  margin: 10px;
`;
const PageMessage = ({ image, alt, message }) => {
  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column" css={FlexStyle}>
      <Image src={image} alt={alt} />
      <ContentWrapper>
        <ContentText>{message}</ContentText>
        <Button
          width="117px"
          height="50px"
          color="#ffffff"
          border="none"
          backgroundColor="#2ac1bc"
          fontSize="18px"
          css={ButtonStyle}
        >
          <LinkStyle to="/">쇼핑하러 가기</LinkStyle>
        </Button>
      </ContentWrapper>
    </Flex>
  );
};

PageMessage.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default PageMessage;
