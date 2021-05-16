import styled from "styled-components";
import * as reactRouterDom from "react-router-dom";

export const NoOrder = styled.article`
  width: 30rem;
  margin: 2rem auto;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
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
