import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const LogoContainer = styled(Link)`
  font-size: 2rem;
  display: flex;
  align-items: center;
  color: white;
  font-weight: 900;

  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;

export { LogoContainer };
