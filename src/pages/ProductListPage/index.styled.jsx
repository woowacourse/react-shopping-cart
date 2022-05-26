import styled from "styled-components";

const GridList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;

  height: 100%;
  gap: 28px 12px;
`;

export { GridList };
