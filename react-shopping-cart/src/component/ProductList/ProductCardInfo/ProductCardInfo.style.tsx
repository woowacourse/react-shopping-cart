import styled, { css } from "styled-components";
import { ReactComponent as Cart } from "assets/cart.svg";

export const StyledCart = styled(Cart)`
  width: 20px;
  height: 20px;

  ${({ $isincart }) =>
    $isincart
      ? css`
    & path {
      fill: ${({ theme }) => theme.colors["red_03"]}
    }
    :hover {
      & path {
        fill: ${({ theme }) => theme.colors.cyon};
      }
  `
      : css`
          & path {
            fill: black;
          }

          :hover {
            & path {
              fill: ${({ theme }) => theme.colors.cyon};
            }
          }
        `}
`;

export const ProductCardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  :hover {
    text-decoration: underline;
  }
`;

export const ProductCardInfoContainer = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  width: 188px;
`;
