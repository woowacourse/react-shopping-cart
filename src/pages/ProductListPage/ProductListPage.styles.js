import styled from '@emotion/styled';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 45px;
  place-items: center;
  place-content: start center;
  min-height: 1540px;

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

const PageButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  font-size: 2em;
`;

const PageIndex = styled.span`
  margin: auto 50px;
`;

const LikedProductFilter = styled.div`
  word-break: keep-all;
  max-height: 500px;
  width: 280px;
  text-align: center;
`;

export { Container, PageButtonContainer, PageIndex, LikedProductFilter };
