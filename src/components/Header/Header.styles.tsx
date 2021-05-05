import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 300px;
  background-color: ${({ theme }) => theme.PRIMARY_COLOR};
`;

export const Logo = styled.img`
  margin-right: 23px;
`;

export const HeaderTitle = styled.h1`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.WHITE};
  font-size: 40px;
  font-weight: 900;
`;

export const LinkButton = styled.button`
  color: ${({ theme }) => theme.WHITE};
  font-size: 24px;
  &:not(:last-child) {
    margin-right: 44px;
  }
`;
