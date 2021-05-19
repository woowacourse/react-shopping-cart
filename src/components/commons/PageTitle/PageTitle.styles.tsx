import styled from 'styled-components';

export const PageTitle = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 4px solid ${({ theme }) => theme.BLACK_500};
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.TEXT_COLOR};
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 29px;
`;
