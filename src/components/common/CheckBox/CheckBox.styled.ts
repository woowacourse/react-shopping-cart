import styled from "@emotion/styled";

export const Label = styled.label`
  position: relative;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const CheckBox = styled.div<{ isChecked: boolean }>`
  width: 24px;
  aspect-ratio: 1/1;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: ${(props) => (props.isChecked ? "1px solid #000" : "1px solid #0000001a")};
  background: ${(props) => (props.isChecked ? " #000" : "#fff")};
`;

export const Input = styled.input`
  appearance: none;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  left: 0;
`;
