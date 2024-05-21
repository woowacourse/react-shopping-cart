import styled from '@emotion/styled';
import { theme } from '../../style/theme.style';

interface Props {
  onClick: () => void;
}

const BorderButton = ({
  children,
  onClick,
}: React.PropsWithChildren<Props>) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default BorderButton;

const StyledButton = styled.button`
  width: fit-content;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid ${theme.color.blackWithOpacity};
  background-color: ${theme.color.white};
  font-size: ${theme.fontSize.small};
  cursor: pointer;
`;
