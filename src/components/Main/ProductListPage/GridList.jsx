import React from "react";
import styled from "styled-components";

const GridContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;

  height: 100%;
  gap: 28px 12px;

  overflow-y: hidden;

  :hover {
    overflow-y: auto;
  }
`;

function GridList({ children }) {
  return <GridContainer>{children}</GridContainer>;
}

export default GridList;
