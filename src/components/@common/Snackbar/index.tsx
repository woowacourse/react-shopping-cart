import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Text from 'components/@common/Text';
import Flex from 'components/@common/Flex';

interface SnackBarProps {
  message: string;
}

const SnackBar = ({ message }: SnackBarProps) => {
  return (
    <Styled.Container>
      <Flex h="100%" justify="center" align="center">
        <Text>{message}</Text>
      </Flex>
    </Styled.Container>
  );
};

const fadeIn = keyframes`
  from {bottom: 0; opacity: 0;}
  to {bottom: 40px; opacity: 1;}
`;

const fadeOut = keyframes`
  from {bottom: 40px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
`;

const Styled = {
  Container: styled.div`
    height: 50px;
    padding: 0 60px;

    position: fixed;
    left: 40px;
    bottom: 40px;

    font-size: 18px;
    font-weight: 600;

    animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s 1.5s;

    ${({ theme }) => css`
      background: ${theme.colors.black};
      color: ${theme.colors.white};
    `};
  `,
};

export default SnackBar;
