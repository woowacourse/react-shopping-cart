import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PlainLink = styled(Link)`
  text-decoration: none;
  color: ${({
    theme: {
      colors: { white },
    },
  }) => white};
`;

export default PlainLink;
