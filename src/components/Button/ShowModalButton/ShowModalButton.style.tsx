import styled from 'styled-components';

export const Layout = styled.button`
  width: 100%;
  height: ${({ theme }) => theme.boxHeight.sm};
  border: 1px solid ${({ theme }) => theme.color.primary.light};
  border-radius: 5px;

  color: grey;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;
`;
