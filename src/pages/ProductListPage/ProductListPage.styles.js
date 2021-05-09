import styled from '@emotion/styled';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 45px;
  place-items: center;
  place-content: center;

  @media screen and (max-width: 1259px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 929px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 604px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export { Container };
