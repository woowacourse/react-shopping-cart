import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import woowa from '../../../../public/행성이.png';
import { AppLayout } from '../AppLayout';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Text } from '../Text';

export const NotFound = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate('/');
  };
  return (
    <AppLayout>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap="20px"
        height="100vh"
      >
        <StyledImg src={woowa} alt="404 Not Found" />
        <Text type="Heading" weight="semibold">
          경로가 잘못되었습니다.
        </Text>
        <Button size="xl" width="100%" onClick={handleNavigateHome}>
          홈으로 돌아가기
        </Button>
      </Flex>
    </AppLayout>
  );
};

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledImg = styled.img`
  width: 150px;
  height: 130px;
  object-fit: fit-contain;
  border-radius: 8px;

  animation: ${rotate360} 3s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;
