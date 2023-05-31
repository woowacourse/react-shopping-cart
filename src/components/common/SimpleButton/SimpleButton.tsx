import styled from "styled-components";

type SimpleButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: "button" | "submit";
  width: string;
  children: string;
};

type ButtonProps = {
  width: string;
  children: string;
};

const SimpleButton = ({
  onClick,
  type,
  width,
  children,
}: SimpleButtonProps) => {
  return (
    <Container>
      <Button type={type} width={width} onClick={onClick}>
        {children}
      </Button>
    </Container>
  );
};

const colors = {
  gold: "#ffdf7e",
  lightGold: "#ffeaac",
  transparentGold: "#ffdf7eb5",
  pureBlack: "#000",
};

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: auto;
  height: auto;
  overflow: hidden;
`;

const Button = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: 73px;
  background-color: ${colors.transparentGold};
  border: 3px solid ${colors.gold};
  transition: 0.7s;
  font-size: 24px;
  font-family: "Noto Sans KR";
  font-weight: 600;

  &:hover {
    background-color: ${colors.gold};
    box-shadow: 0 0 16px ${colors.gold};
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      ${colors.lightGold},
      transparent
    );
    transition: 0.4s;
  }

  &:hover:before {
    left: 100%;
  }
`;

export default SimpleButton;
