import styled from "@emotion/styled";

const StyledCheckbox = styled.input`
  appearance: none;
  border: 1px solid ${(props) => props.theme.colors.green};
  border-radius: 2px;
  width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;
  align-self: start;

  &:focus {
    outline: none;
  }

  &:checked {
    background-color: ${(props) => props.theme.colors.green};
  }

  &:after {
    content: "✔";
    width: 100%;
    height: 100%;
    font-size: 0.75rem;
    color: ${(props) => props.theme.colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default StyledCheckbox;
