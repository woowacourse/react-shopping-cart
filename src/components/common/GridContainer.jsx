import React from "react";
import styled from "styled-components";

const GridList = styled.ul`
  display: grid;
  grid-template-columns: ${({ colNo }) => `repeat(${colNo}, 1fr)`};
  justify-items: center;
  align-items: center;
  gap: 28px 12px;

  width: 100%;
  height: 100%;
  padding: 0 16px;

  overflow-y: hidden;

  :hover {
    overflow-y: auto;
  }
`;

function GridContainer({ children, colNo }) {
  return <GridList colNo={colNo}>{children}</GridList>;
}

export default GridContainer;
