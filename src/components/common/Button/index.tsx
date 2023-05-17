import { styled } from 'styled-components';

interface ButtonProps {
  text: string;
  onClick: () => void;
  width?: string;
  height?: string;
  fontSize?: string;
  background?: string;
  color?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <ButtonWrapper
      onClick={props.onClick}
      style={{
        width: props.width,
        height: props.height,
        fontSize: props.fontSize,
        color: props.color,
        background: props.background,
      }}
    >
      {props.text}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  width: 388px;
  height: 73px;

  font-size: 24px;

  background: #333333;
  color: #ffffff;

  border: 1px solid #bbbbbb;
`;

export default Button;
