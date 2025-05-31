import styled from "@emotion/styled";

export const Button = styled.button<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  background-color: ${(props) =>
    props.isDisabled ? "rgba(0,0,0,0.1)" : "#000"};
  border-radius: 4px;
  gap: 4px;
  width: 100%;
  color: #ffffff;
  font-weight: 600;
  font-family: "Noto Sans";
  font-size: 12px;
`;
