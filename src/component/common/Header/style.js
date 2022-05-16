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
`;

const HeaderButtonBox = styled.div`
  display: flex;
`;

export {HeaderLayout, HeaderButtonBox};
