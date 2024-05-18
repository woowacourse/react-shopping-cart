import { THEME } from '../../style/theme';
import styled from '@emotion/styled';

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
  border: 1px solid ${THEME.color.blackWithOpacity};
  background-color: ${THEME.color.white};
  font-size: ${THEME.fontSize.small};
  cursor: pointer;
`;
