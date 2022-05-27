import {NavLink} from 'react-router-dom';
import {FlexRow} from 'style/common';
import styled from 'styled-components';

const HeaderLayout = styled(FlexRow)`
  position: fixed;
  top: 0;
  left: 0;

  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  padding: 18px 10%;

  width: 100vw;
  height: 80px;

  background-color: #2ac1bc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);

  z-index: 1;

  .active {
    transform: scale(1.1);
    font-weight: bold;
  }
`;

const HeaderNavBox = styled.div`
  display: flex;
`;

const NavText = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  font-size: 24px;
  color: ${({theme}) => theme.WHITE};
`;

export {HeaderLayout, HeaderNavBox, NavText};
