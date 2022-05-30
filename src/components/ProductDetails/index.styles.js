import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ProductDetailsContainer = styled.div`
  width: 100%;
`;

export const ProductDetailsImage = styled.img`
  display: block;
  width: 570px;
  height: 570px;
  object-fit: contain;
  margin: auto;
  @media screen and (max-width: 850px) {
    width: 350px;
    height: 350px;
  }
`;

export const ProductDetailsTitle = styled.h3`
  ${({ theme }) => css`
    font-size: 2rem;
    font-weight: 700;
    line-height: 2.25em;
    letter-spacing: 0.5px;
    text-align: left;
    border-bottom: 4px solid ${theme.color.grey_002};
    padding: 1.5em;
    @media screen and (max-width: 850px) {
      font-size: 1.5rem;
      padding: 1em;
    }
  `}
`;

export const PriceContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    p {
      font-size: 2rem;
      color: ${theme.color.grey_004};
      padding: 1.5em;
    }
    @media screen and (max-width: 850px) {
      p {
        font-size: 1.2rem;
        padding: 1rem;
      }
    }
  `}
`;

export const ShoppingCartButton = styled.button`
  ${({ theme }) => css`
    width: 100%;
    height: 100px;
    border: none;
    background-color: ${theme.color.primary};
    color: ${theme.color.white};
    font-weight: bold;
    font-size: 2rem;
    &:hover {
      opacity: 0.9;
    }
    @media screen and (max-width: 850px) {
      font-size: 1rem;
      height: 40px;
    }
  `}
`;
