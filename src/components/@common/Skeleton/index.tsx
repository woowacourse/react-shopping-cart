import React from 'react';
import styled, { keyframes } from 'styled-components';

import Box from 'components/@common/Box';
import Flex from 'components/@common/Flex';

const Skeleton = () => {
  return (
    <Styled.Container>
      <Flex direction="column" gap="14px">
        <Styled.ThumbnailBox />
        <Styled.Content>
          <Flex justify="space-between">
            <Box w="200px">
              <Flex direction="column" gap="5px">
                <Styled.Text />
                <Styled.Text />
              </Flex>
            </Box>
            <Styled.Icon />
          </Flex>
        </Styled.Content>
      </Flex>
    </Styled.Container>
  );
};

const loading = keyframes`
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
`;

const Styled = {
  Container: styled.div`
    width: 282px;
    height: 358px;
    box-shadow: 3px 3px 5px 0px #00000040;
  `,
  ThumbnailBox: styled.div`
    height: 282px;
    animation: ${loading} 1.5s infinite ease-in-out;
  `,
  Content: styled.div`
    line-height: 22px;
    padding: 0 10px;
  `,
  Text: styled.div`
    animation: ${loading} 1.5s infinite ease-in-out;
    width: 200px;
    height: 23px;
  `,
  Icon: styled.div`
    animation: ${loading} 1.5s infinite ease-in-out;
    width: 50px;
  `,
};

export default Skeleton;
