import styled from "@emotion/styled";

export const CheckboxWrapper = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: ${(props) => (props.checked ? "#000" : "#fff")};
  color: ${(props) => (props.checked ? "#fff" : "rgba(0, 0, 0, 0.1)")};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

export const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;
`;
