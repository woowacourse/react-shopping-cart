import styled from 'styled-components';

const InputStyled = styled.input(
  ({ theme }) => `
  display: none;

  :checked + label {
    background-color: ${theme.mainColor};
  }
  :checked + label::after {
    content: '∨';
    width: 28px;
    height: 28px;
    text-align: center;
    font-size: 28px;
    
  }
`,
);

const LabelStyled = styled.label(
  ({ theme }) => `
  display: inline-block;
  width: 28px;
  height: 28px;
  border: 1px solid ${theme.mainColor};
  border-radius: 2px;
  cursor: pointer;
  color: white;
  `,
);

export { InputStyled, LabelStyled };
