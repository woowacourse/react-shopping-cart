import { FlexCenter } from '@/style/common.style';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

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

  color: ${theme.color.white};
  font-size: ${theme.fontSize.medium};
  font-weight: ${theme.fontWeight.bold};
  border: none;
  cursor: pointer;
  background-color: ${({ disable }) =>
    disable ? theme.color.grey : theme.color.black};
`;
