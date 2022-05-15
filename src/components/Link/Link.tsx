import { Link as BasicLink, To } from 'react-router-dom';
import styled, { css } from 'styled-components';

type Props = {
  to: To;
  disabled?: boolean;
  children: React.ReactNode;
};

function Link({ to, disabled = false, children }: Props) {
  return (
    <StyledLink to={to} disabled={disabled}>
      {children}
    </StyledLink>
  );
}

const StyledLink = styled(BasicLink)`
  text-decoration: none;
  color: inherit;

  ${({ disabled }: Pick<Props, 'disabled'>) => css`
    ${disabled ? 'pointer-events: none;' : ''}
  `}

  &.disabled {
    pointer-events: none;
  }
`;

export default Link;
