import styled from 'styled-components';

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 10%;

  width: 100vw;
  height: 80px;

  background-color: #2ac1bc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);

  z-index: 100;

  @media ${({theme}) => theme.DEVICE.tablet} {
    & svg {
      width: 120px;
    }

    & button {
      font-size: 16px;
    }
  }
`;

export {HeaderWrapper};
