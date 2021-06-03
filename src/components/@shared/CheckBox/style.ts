import styled from "styled-components";

import { COLOR } from "../../../constants/theme";
import { FlexCenter } from "../../../sharedStyled/Flex";

const Container = styled.label`
  display: flex;
  position: relative;
`;

const CheckMark = styled.span`
  display: inline-block;
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid ${COLOR.MAIN};
  border-radius: 0.125rem;
`;

const Input = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;

  &:checked ~ ${CheckMark} {
    background-color: ${COLOR.MAIN};
  }
`;

const Svg = styled.svg`
  width: 28px;
  height: 28px;
`;

const Path = styled.path`
  fill: none;
  stroke: ${COLOR.WHITE};
  stroke-width: 1px;
`;

export { Container, CheckMark, Input, Svg, Path };
