import styled from "@emotion/styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClickHandler?: () => void;
  backgroundColor?: string;
  type?: "button" | "submit" | "reset";
}

function Button({ backgroundColor, color, children, ...props }: ButtonProps) {
  return (
    <ButtonContainer style={{ backgroundColor, color }} {...props}>
      {children}
    </ButtonContainer>
  );
}

export default Button;

const ButtonContainer = styled.button`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  color: #333333bf;
  border: 1px solid #33333340;
  border-radius: 4px;
  &:hover {
    border: 1px solid #333333;
    color: #333333;
  }
`;
