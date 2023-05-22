import styled from "styled-components";

interface MiniButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: "button" | "submit";
  width: string;
  children: string;
}

interface ButtonProps {
  width: string;
  children: string;
}

const MiniButton = ({ onClick, type, width, children }: MiniButtonProps) => {
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
  lightGold: "#ffe9a7",
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
  height: 35px;
  background-color: ${colors.gold};
  border-radius: 3px;
  transition: 0.3s;
  font-size: 18px;
  font-family: "Noto Sans KR";
  font-weight: 600;

  &:hover {
    background-color: ${colors.lightGold};
    box-shadow: 0 0 5px ${colors.lightGold};
  }
`;

export default MiniButton;
