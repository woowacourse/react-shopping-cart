import styled from 'styled-components';

import { BREAKPOINTS } from '../../../constants';

export const Skeleton = styled.span`
  @keyframes refresh {
    0% {
      background-position: calc(-100px);
    }
    40%,
    100% {
      background-position: 320px;
    }
  }

  background-image: linear-gradient(90deg, #e0e0e0 0px, #ededed 30px, #e0e0e0 60px);
  animation: refresh 2s infinite ease-out;
  width: 100%;
  height: auto;
  margin: 0.5rem 0;
`;

export const SkeletonLine = styled(Skeleton)`
  height: 1rem;
`;

export const SkeletonRound = styled(Skeleton)`
  border-radius: 50%;
`;

export const SkeletonResponsiveBox = styled(Skeleton)`
  @media (min-width: ${BREAKPOINTS.MOBILE}) {
    height: 6rem;
  }

  @media (min-width: ${BREAKPOINTS.TABLET}) {
    height: 10rem;
  }

  @media (min-width: ${BREAKPOINTS.LAPTOP_S}) {
    height: 12rem;
  }

  @media (min-width: ${BREAKPOINTS.LAPTOP_M}) {
    height: 14rem;
  }

  @media (min-width: ${BREAKPOINTS.DESKTOP}) {
    height: 16rem;
  }
`;
