import styled from "styled-components";
import * as reactRouterDom from "react-router-dom";
import SCREENS from "../../../constants/screens";

export const NoCartItem = styled.article`
  max-width: 30rem;
  margin: 2rem auto;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Image = styled.img`
  width: 16rem;
  height: 16rem;
  aspect-ratio: 1 / 1;
  object-fit: contain;

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    width: 100%;
    height: 100%;
  }
`;

export const Text = styled.h2`
  font-size: 2rem;
  line-height: 3rem;
  font-family: monospace;
  text-align: center;
`;

export const Link = styled(reactRouterDom.Link)`
  font-size: 1.5rem;
  line-height: 2.25rem;
  width: 100%;
`;
