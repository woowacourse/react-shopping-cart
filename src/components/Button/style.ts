import styled from 'styled-components';

type ButtonProps = {
  width: string;
  backgroundColor: string;
};

export const Button = styled.button<ButtonProps>`
  border: none;
  background-color: ${(props) => props.backgroundColor};
  color: #ffffff;
  width: ${(props) => props.width};
  padding: 20px 0px;
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
`;
