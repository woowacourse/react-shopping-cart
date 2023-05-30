import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 160px auto;
  width: 100%;
  max-width: 1200px;

  h2 {
    font-size: 32px;
    font-weight: 600;
    color: #04c09e;
  }

  p:nth-of-type(1) {
    margin-top: 24px;
  }
`;

export const GoToHomeButtonWrapper = styled(Link)`
  margin-top: 48px;
  text-decoration: none;

  button {
    color: #ffffff;
    border-radius: 4px;
  }
`;
