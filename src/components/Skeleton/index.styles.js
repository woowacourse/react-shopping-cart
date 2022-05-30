import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const SkeletonContainer = styled.div`
  ${({ width, height }) => css`
    width: ${width};
    height: ${height};

    background-image: linear-gradient(
      90deg,
      #e0e0e0 0px,
      #ededed 30px,
      #e0e0e0 60px
    );
    animation: refresh 1.7s infinite ease-out;

    @keyframes refresh {
      0% {
        background-position: calc(-100px);
      }
      40%,
      100% {
        background-position: 320px;
      }
    }
  `}
`;
