import styled from '@emotion/styled';

export const LayoutContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fff;

  @media (min-width: 768px) {
    width: 429px;
  }
`;
