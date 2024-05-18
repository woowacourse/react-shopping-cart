import { Skeleton } from "@/styles/common";
import styled from "styled-components";

export const Title = styled.h1`
  ${({ theme }) => theme.TEXT.Title}
  height:45px;
  ${Skeleton}
`;
