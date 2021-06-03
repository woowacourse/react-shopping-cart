import styled from "styled-components";

type Tag = "div";
// type Tag = keyof JSX.IntrinsicElements

const Grid = (tagName: Tag) => styled[tagName]`
  display: grid;
`;

const DivGrid = Grid("div");

export { Grid, DivGrid };
