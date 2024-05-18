import { FlexCenter } from "@/style/common.style";
import styled from "@emotion/styled";

interface Props {
  disabled?: boolean;
  onClick: () => void;
}

const FullWidthButton = ({
  children,
  disabled = false,
  onClick,
}: React.PropsWithChildren<Props>) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default FullWidthButton;

const StyledButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 64px;
  box-sizing: border-box;

  ${FlexCenter}

  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ disabled }) => (disabled ? "#BEBEBE" : "#000000")};
`;
