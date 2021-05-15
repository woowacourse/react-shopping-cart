import styled, { css, keyframes } from "styled-components";

const skeletonRefresh = keyframes`
0% {
  background-position: calc(-7rem);
}
40%,
100% {
  background-position: 15.5rem;
}
`;

const skeleton = css`
  background-image: linear-gradient(
    90deg,
    #e0e0e0 0,
    #ededed 3rem,
    #e0e0e0 6rem
  );
  animation: ${skeletonRefresh} 2s infinite ease-out;
`;

export const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  ${({ isLoading }) => isLoading && skeleton};
`;
