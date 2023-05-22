import styled from '@emotion/styled';

interface ButtonProps {
  primary?: boolean;
  size: 'small' | 'big';
  text: string;
  width?: string | number;
  isValid?: boolean;
  onClick?: () => void;
}

const Button = ({ isValid = true, text, onClick, ...props }: ButtonProps) => {
  return (
    <ButtonStyle {...props} isValid={isValid} onClick={onClick}>
      {text}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button<Omit<ButtonProps, 'text'>>`
  outline: none;
  font-family: 'Noto Sans KR';
  font-style: normal;
  text-align: center;

  ${({ primary }) =>
    primary
      ? `
        background-color: #04C09E;
        color: #fff;
    `
      : `
        background-color: #fff;
        color: #333;
        border: 1px solid #bbb;
    `}

  ${({ size, width }) =>
    size === 'big'
      ? `
        font-weight: 700;
        font-size: 18px;
        width: ${width ? (typeof width === 'string' ? width : width + 'px') : '338px'};
        height: 60px;
    `
      : `
        font-weight: 400;
        font-size: 16px;
        width: ${width ? (typeof width === 'string' ? width : width + 'px') : '98px'};
        height: 35px;
    `}

    ${({ isValid }) =>
    !isValid &&
    `
        cursor: not-allowed;
        background-color: rgba(0,0,0,0.05);
        color: rgb(177, 179, 181)
    `}
`;
