import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Root = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 80px;

  background-color: black;
`;

export const LinkToHome = styled(Link)`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  width: 5rem;
  height: 4.4rem;
  margin-right: 2rem;
`;

export const Title = styled.div`
  font-size: 4rem;
  font-weight: 900;
  color: white;
`;

export const LinkToCart = styled(Link)`
  font-size: 2.4rem;
  font-weight: 500;

  margin-right: 1rem;

  color: white;
`;

export const Badge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.6rem;
  height: 2.6rem;

  font-size: 1.6rem;

  border-radius: 50%;

  color: white;
  background-color: #04c09e;
`;
