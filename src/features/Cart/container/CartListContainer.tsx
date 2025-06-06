import { PropsWithChildren } from "react";
import styled from "@emotion/styled";

type StyledCartListContainerProps = {
  variant?: "cart" | "review";
};

export const CartListContainer = ({
  children,
  variant = "cart",
}: PropsWithChildren<StyledCartListContainerProps>) => {
  return <StyledCartListContainer variant={variant}>{children}</StyledCartListContainer>;
};

const StyledCartListContainer = styled.div<StyledCartListContainerProps>`
  position: relative;
  width: 100%;
  min-height: ${({ variant = "cart" }) => (variant === "cart" && "350px")};
  max-height: ${({ variant = "cart" }) => (variant === "review" && "150px")};
  overflow-y: auto;
  padding: ${({ variant = "cart" }) => (variant === "cart" ? "0px 20px" : "0")};
  flex: 2;
`;
