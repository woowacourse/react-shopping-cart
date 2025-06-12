import styled from "@emotion/styled";
import { size } from "./styles";

export const AppWrapper = styled.div`
  position: relative;
  max-width: ${size.mobileWidth}px;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100vh;
  margin: 0 auto;
`;
