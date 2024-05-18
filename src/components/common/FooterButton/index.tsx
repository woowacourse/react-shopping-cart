import styled from "styled-components";
import { COLOR } from "../../../constants/styles";

interface FooterButtonProps {
  buttonText: string;
  onClick: () => void;
  disabled?: boolean;
}

const FooterButton = ({ buttonText, onClick, ...props }: FooterButtonProps) => {
  return (
    <FooterButtonContainer>
      <Button onClick={onClick} {...props}>
        {buttonText}
      </Button>
    </FooterButtonContainer>
  );
};

export default FooterButton;

const FooterButtonContainer = styled.div``;

const Button = styled.button`
  position: fixed;
  height: 64px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  background: ${COLOR.black};
  color: ${COLOR.white};
  width: 429px;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:disabled {
    background-color: ${COLOR.grey.light};
    cursor: not-allowed;
  }
`;
