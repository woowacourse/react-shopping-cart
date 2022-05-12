import { Link, To } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  to: To;
  disabled?: boolean;
  children: React.ReactNode;
};

function PlainLink({ to, disabled = false, children }: Props) {
  console.log(disabled);
  return (
    <StyledLink to={to} className={disabled ? 'disabled' : ''}>
      {children}
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &.disabled {
    pointer-events: none;
  }
`;

export default PlainLink;
