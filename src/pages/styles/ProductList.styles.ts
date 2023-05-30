import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 60px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;
  gap: 12px;

  @media screen and (max-width: 1180px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 870px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 580px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
