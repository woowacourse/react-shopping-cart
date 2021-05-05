import React from 'react';
import styled from 'styled-components';
import mainLogo from '../assets/mainPageLogo.png';

const StyledImg = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const Main = (props) => {
  return (
    <div>
      <StyledImg src={mainLogo} height="200px" weight="200px" alt="main-logo" />
    </div>
  );
};

export default Main;
