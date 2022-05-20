import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
`;

export const Amount = styled.div`
  font-size: 1.3rem;
  padding: 20px 0;
  border-bottom: 2px solid ${({ theme }) => theme.greyColor_1};
`;
