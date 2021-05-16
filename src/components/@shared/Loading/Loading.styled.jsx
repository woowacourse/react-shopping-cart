import styled from "styled-components";
import { COLOR } from "../../../constants/style";

export const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${COLOR.WHITE};
  font-size: 1.5rem;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const LoadingIcon = styled.svg`
  display: block;
  shape-rendering: auto;
`;
