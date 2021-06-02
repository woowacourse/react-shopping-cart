import styled from "styled-components";

type Tag = "div" | "section";
// type Tag = keyof JSX.IntrinsicElements

const Grid = (tagName: Tag) => styled[tagName]`
  display: grid;
`;

const FlexBetween = (tagName: Tag) => styled[tagName]`
  display: flex;
  justify-content: space-between;
`;

const DivGrid = Grid("div");

export { Grid, DivGrid };
