import { styled } from 'styled-components';

export const PageTitle = styled.div`
  text-align: center;

  margin-bottom: 30px;
  padding: 24px 0;

  font-size: 24px;
  font-weight: 700;

  border-bottom: 3px solid var(--grey-400);

  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;

export const Content = styled.div`
  display: flex;

  @media screen and (min-width: 1080px) {
    justify-content: space-between;
  }

  @media screen and (max-width: 767px) {
    margin-bottom: 80px;
  }
`;
