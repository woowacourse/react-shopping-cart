import styled from "@emotion/styled";

export const Container = styled.label`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const HiddenCheckBox = styled.input`
  display: none;
`;

export const CheckBox = styled.img<{ disabled: boolean }>`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const Label = styled.label<{ disabled: boolean }>`
  cursor: ${({ disabled }) => disabled ?? "pointer"};
  font-size: 12px;
`;
