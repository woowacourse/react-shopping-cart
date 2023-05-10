import styled from 'styled-components';

export const Container = styled.div`
  background-color: #333333;
  padding: 10px 0;
  width: 100%;
  min-width: 1024px;
  margin-bottom: 50px;
`;

export const Layout = styled.div`
  display: flex;
  width: 60%;
  min-width: 1024px;
  margin: auto;
  justify-content: space-between;
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
`;
