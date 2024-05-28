import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  align-items: center;
  column-gap: 3px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  p {
    padding-top: 2px;
  }
`;

export const InfoIcon = styled.img`
  width: 16px;
  height: 16px;
`;
