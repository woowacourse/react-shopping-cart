import { useState } from 'react';
import MswHandler from './MswHandler';
import * as Styled from './MswHandlerButton.styled';

const MswHandlerButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Styled.ContainerDiv>
      <Styled.OpenButton
        type="button"
        aria-label="MSW 설정창 열기 또는 닫기"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        MSW 설정
      </Styled.OpenButton>
      <MswHandler open={isOpen} />
    </Styled.ContainerDiv>
  );
};

export default MswHandlerButton;
