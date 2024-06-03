import styled from 'styled-components';

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  min-height: 64px;
  padding: 0 24px;
  background-color: black;

  position: sticky;
  top: 0;
`;

export const PrefixButton = styled.button`
  background: none;
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

export const SvgContainer = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 24px;
  width: 24px;
`;
