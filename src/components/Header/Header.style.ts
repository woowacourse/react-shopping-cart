import styled from 'styled-components';

export const Header = styled.div`
  position: fixed;
  width: 100%;
  max-width: 768px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 64px;
  padding: 0 24px;
  background-color: black;
`;

export const PrefixButton = styled.button`
  background-color: transparent;
`;

export const Suffix = styled.div``;

export const Logo = styled.h1`
  color: white;

  font-family: Noto Sans;
  font-size: 20px;
  font-weight: 800;
  line-height: 16px;
  text-align: left;
`;
