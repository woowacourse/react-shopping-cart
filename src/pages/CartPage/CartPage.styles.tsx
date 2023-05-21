import styled, { css } from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  //840px 가로
  @media (max-width: 840px) {
    flex-direction: column;
    align-items: center;
  }
`;
