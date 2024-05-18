import { FlexCenter } from '@/style/common.style';
import { THEME } from '@/style/theme';
import styled from '@emotion/styled';

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

  color: ${THEME.color.white};
  font-size: ${THEME.fontSize.medium};
  font-weight: ${THEME.fontWeight.bold};
  border: none;
  cursor: pointer;
  background-color: ${({ disable }) =>
    disable ? THEME.color.grey : THEME.color.black};
`;
