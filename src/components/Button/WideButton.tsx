import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

interface Props {
  onClick: () => void;
  color: string;
}

const WideButton = ({
  children,
  onClick,
  color,
}: React.PropsWithChildren<Props>) => {
  return (
    <StyledButton onClick={onClick} color={color}>
      {children}
    </StyledButton>
  );
};
export default WideButton;

const StyledButton = styled.button<{ color: string }>`
  width: 90%;
  height: 52px;
  box-sizing: border-box;

  color: ${({ color }) =>
    color === 'white' ? theme.color.black : theme.color.white};
  font-size: ${theme.fontSize.medium};
  font-weight: ${theme.fontWeight.bold};

  border: 1px solid ${({ color }) => color === 'white' && theme.color.grey};
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ color }) => color};
`;
