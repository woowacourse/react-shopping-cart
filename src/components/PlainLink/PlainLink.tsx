import { Link, To } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  to: To;
  disabled?: boolean;
  children: React.ReactNode;
};

const PlainLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  pointer-events: ${(props: Props) => (props.disabled ? 'none' : 'auto')};
`;
export default PlainLink;
