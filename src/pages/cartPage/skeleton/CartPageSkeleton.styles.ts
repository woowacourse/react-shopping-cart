import { css } from "@emotion/react";
import { shimmer } from "../../../animations/animations";

const skeletonBase = css`
  background: linear-gradient(
    90deg,
    var(--color-light-grey) 25%,
    var(--color-grey) 50%,
    var(--color-light-grey) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export const cartTitleSkeleton = css`
  ${skeletonBase}
  width: 100%;
  height: 3rem;
  border-radius: 4px;
`;

export const cartContentSkeleton = css`
  ${skeletonBase}
  width: 100%;
  height: 10rem;
  border-radius: 4px;
  margin: 1.2rem 0;
`;

export const cartCheckboxSkeleton = css`
  ${skeletonBase}
  width: 100%;
  height: 1.6rem;
  border-radius: 4px;
`;
