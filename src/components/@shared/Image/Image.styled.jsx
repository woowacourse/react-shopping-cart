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

export const ImageWrapper = styled.div`
  position: relative;
  height: 0;
  padding-top: 50%;
  padding-bottom: 50%;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
  border-radius: 0.25rem;

  ${({ isLoading }) => isLoading && skeleton};
`;
