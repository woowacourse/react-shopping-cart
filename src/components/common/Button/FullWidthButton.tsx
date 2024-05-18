import { FlexCenter } from "@/style/common.style";
import styled from "@emotion/styled";

interface Props {
  disable?: boolean;
  onClick: () => void;
}

const FullWidthButton = ({
  children,
  disable = false,
  onClick,
}: React.PropsWithChildren<Props>) => {
  return (
    <StyledButton disable={disable} onClick={disable ? () => {} : onClick}>
      {children}
    </StyledButton>
  );
};

export default FullWidthButton;

const StyledButton = styled.button<{ disable: boolean }>`
  width: 100%;
  height: 64px;
  box-sizing: border-box;

  ${FlexCenter}

  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  background-color: ${({ disable }) => (disable ? "#BEBEBE" : "#000000")};
`;
