import React from 'react';
import styled from 'styled-components';
import homePageLogo from '../assets/homePageLogo.png';

const HomeImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const Home = () => {
  return (
    <>
      <HomeImage src={homePageLogo} height="200px" weight="200px" alt="main-logo" />
    </>
  );
};

export default Home;
