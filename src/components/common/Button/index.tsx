import { styled } from 'styled-components';

interface ButtonStyle {
  width?: string;
  height?: string;
  fontSize?: string;
  background?: string;
  color?: string;
}

interface ButtonProps extends ButtonStyle {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick, ...rest }: ButtonProps) => {
  return <ButtonWrapper {...rest} onClick={onClick}>{text}</ButtonWrapper>;
};

const ButtonWrapper = styled.button<ButtonStyle>`
  width: ${({ width }) => width ?? '388px'};
  height: ${({ height }) => height ?? '73px'};

  font-size: ${({ fontSize }) => fontSize ?? '24px'};

  background: ${({ background }) => background ?? '#333333'};
  color: ${({ color }) => color ?? '#FFFFFF'};

  border: 1px solid #bbbbbb;
`;

export default Button;
