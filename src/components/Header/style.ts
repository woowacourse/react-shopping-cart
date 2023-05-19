import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  background-color: #333333;
  padding: 10px 0;
  width: 100%;
  z-index: 1;
`;

export const Layout = styled.div`
  display: flex;
  margin: auto;
  justify-content: space-between;

  padding: 0 5%;

  min-width: 90%;
`;

export const LogoWrapper = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
`;

export const LogoImg = styled.img`
  margin-right: 15px;
  width: 40px;
`;

export const LogoText = styled.span`
  position: relative;
  top: 4px;
  font-size: 40px;
  font-weight: 900;

  @media (max-width: 300px) {
    display: none;
  }
`;
