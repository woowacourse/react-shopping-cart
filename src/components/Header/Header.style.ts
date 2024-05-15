import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  height: 64px;
  padding: 0 24px;
  background-color: black;

  position: sticky;
`;

export const Prefix = styled.div``;

export const Suffix = styled.div``;

export const Logo = styled.h1`
  color: white;

  font-family: Noto Sans;
  font-size: 20px;
  font-weight: 800;
  line-height: 16px;
  text-align: left;
`;

export const SvgContainer = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 24px;
  width: 24px;
`;
