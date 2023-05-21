import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ErrorMessage = styled.div`
  font-size: 5rem;
  font-weight: 800;
  text-align: center;
`;

export const LinkToHome = styled(Link)`
  text-decoration: none;
  font-size: 3rem;
  text-align: center;

  cursor: pointer;
`;
