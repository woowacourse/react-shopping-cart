import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0px 24px;
  background: #000000;

  img {
    width: 56px;
  }
`;

export const MainLogo = styled.img`
  width: 56px;
`;

export const GoBackButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 20px;
  }
`;
