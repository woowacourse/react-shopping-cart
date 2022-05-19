import styled from "styled-components";

const CheckBox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  border: 1px solid ${({ theme }) => theme.colors.TEAL_400};
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 2px;

  :checked {
    background-color: ${({ theme }) => theme.colors.TEAL_400};
  }

  :checked:after {
    content: "✔";
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.GRAY_50};
  }
`;

export default CheckBox;
