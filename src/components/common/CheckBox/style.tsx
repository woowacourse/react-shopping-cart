import styled from "@emotion/styled";

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  background: red;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
`;

export const StyledCheckbox = styled.button`
  border: none;
  transition: all 150ms;
  cursor: pointer;
  background: transparent;

  img {
    display: block;
    width: 24px;
    height: 24px;
  }
`;

export const StyledLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
`;
