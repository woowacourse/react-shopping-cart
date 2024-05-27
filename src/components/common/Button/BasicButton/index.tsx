import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../../../constants/styles";

interface BasicButtonProps extends React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  label: string;
  onClick: () => void;
}

const BasicButton = ({ label, onClick, ...props }: BasicButtonProps) => {
  return (
    <Button onClick={onClick} {...props}>
      {label}
    </Button>
  );
};

export default BasicButton;

const Button = styled.button`
  box-sizing: border-box;
  border: 1px solid #0000001a;
  border-radius: 4px;
  width: 40px;
  height: 24px;
  font-size: ${FONT_SIZE.small};
  font-weight: ${FONT_WEIGHT.medium};
  padding: 0;
  background: ${COLOR.white};
  color: ${COLOR.black};

  &:hover {
    border-color: ${COLOR.grey.smoky};
  }
`;
