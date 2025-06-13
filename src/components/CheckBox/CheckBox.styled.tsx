import styled from "@emotion/styled";

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Input = styled.input<{ checked: boolean; disabled?: boolean }>`
  width: 24px;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${({ checked, disabled }) =>
    disabled ? "#f5f5f5" : checked ? "#000" : "transparent"};
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:checked {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#000")};
  }

  &:checked::after {
    content: "✓";
    color: ${({ disabled }) => (disabled ? "#999" : "white")};
    font-size: 16px;
    line-height: 1;
  }
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 400;
`;
