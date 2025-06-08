import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface ButtonProps {
  width: string;
  height: string;
}

interface FlexProps {
  direction: "row" | "column";
  justifyContent?: "space-between" | "space-around";
  alignItems?: "center";
}

export const wrapper = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const flex = (props: FlexProps) => css`
  display: flex;
  flex-direction: ${props.direction};
  justify-content: ${props.justifyContent};
  align-items: ${props.alignItems};
  gap: 5px;
`;

export const ButtonContainer = styled.div`
  ${wrapper}
`;

export const QuantityInfo = styled.div`
  ${wrapper}
`;

export const Input = styled.input`
  width: 24px;
  height: 24px;
  accent-color: black;
  cursor: pointer;
`;

interface StyledButtonProps extends ButtonProps {
  variant?: "dark" | "white";
}

const ButtonColors = {
  dark: {
    color: "#e5e5e5",
    border: "1px solid #0a0d13",
    background: "#0a0d13",
  },
  white: {
    color: "#0a0d13",
    border: "1px solid #e5e5e5",
    background: "#fff",
  },
};

export const Button = styled.button<StyledButtonProps>`
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  color: ${(props) => ButtonColors[props.variant || "white"].color};
  border: ${(props) => ButtonColors[props.variant || "white"].border};
  background: ${(props) => ButtonColors[props.variant || "white"].background};
`;

export const ItemContainer = styled.div`
  ${wrapper}
  width: 290px;
`;

export const Image = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 4px;
`;

export const InfoContainer = styled.div<FlexProps>`
  ${(props) => flex(props)}
  height: 100%;
  width: 150px;
  padding-top: 15px;
`;

export const Name = styled.p`
  font-size: 12px;
`;

export const Price = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

export const PriceContainer = styled.div<FlexProps>`
  ${(props) => flex(props)}
`;

export const QuantityButtonContainer = styled.div<FlexProps>`
  ${(props) => flex(props)}
`;

export const Quantity = styled.p`
  font-size: 12px;
  align-self: center;
`;
