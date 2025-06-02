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

export const Input = styled.input`
  width: 24px;
  height: 24px;
  accent-color: black;
`;

export const Button = styled.button<ButtonProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  color: #0a0d13;
  font-size: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: transparent;
`;

export const ItemContainer = styled.div`
  ${wrapper}
  width: 60%;
`;

export const Image = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 4px;
`;

export const InfoContainer = styled.div<FlexProps>`
  ${(props) => flex(props)}
  height: 100%;
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
