import { Link, To } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  to: To;
  disabled?: boolean;
  children: React.ReactNode;
};

const PlainLink = styled(Link)<Props>`
  text-decoration: none;
  color: inherit;

  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;
export default PlainLink;
