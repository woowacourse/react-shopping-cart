import styled from "@emotion/styled/macro";

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 2px solid #bcbcbc;
  cursor: pointer;
  color: white;
  text-align: center;
`;

export const CheckLabel = styled.p`
  cursor: pointer;
  display: none;
`;

export const Checkbox = styled.input<{ backgroundColor: string }>`
  display: none;
  cursor: pointer;
  &:checked + ${Label} {
    background-color: ${(props) => props.backgroundColor};
    & p {
      display: inline;
    }
  }
`;
