import styled from 'styled-components';

const InputStyled = styled.input(
  ({ theme }) => `
  display: none;

  :checked + label {
    background-color: ${theme.mainColor};
  }
  :checked + label::after {
    content: '✔';
    width: 14px;
    height: 14px;
    text-align: center;

  }
`,
);

const LabelStyled = styled.label(
  ({ theme }) => `
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 1px solid ${theme.mainColor};
  border-radius: 2px;
  cursor: pointer;
  color: white;
  `,
);

export { InputStyled, LabelStyled };
