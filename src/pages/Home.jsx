import React from 'react';
import styled from 'styled-components';
import homePageLogo from '../assets/homePageLogo.png';

const StyledImg = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const Home = () => {
  return (
    <div>
      <StyledImg src={homePageLogo} height="200px" weight="200px" alt="main-logo" />
    </div>
  );
};

export default Home;
