import styled from '@emotion/styled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export default function Button({ title, ...rest }: ButtonProps) {
  return <ButtonStyles {...rest}>{title}</ButtonStyles>;
}

const ButtonStyles = styled.button`
  border: none;
  cursor: pointer;
`;
