import styled from "@emotion/styled";

interface ButtonProps {
  width: string;
  height: string;
}

interface FlexProps {
  direction: "row" | "column";
  justifyContent?: "space-between" | "space-around";
  alignItems?: "center";
}

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Checkbox = styled.input`
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

export const Image = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 4px;
`;

export const A = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
`;

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  gap: 5px;
`;

export const ItemName = styled.p`
  font-size: 12px;
`;

export const ItemPrice = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

export const ButtonContainer = styled.div`
  width: 60%;
`;

export const Quantity = styled.p`
  font-size: 12px;
  align-self: center;
`;
