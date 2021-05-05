import styled from 'styled-components';
import { baeminCyan } from '../../../../constants';

export const NavBar = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 5rem;
  background-color: ${baeminCyan};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  width: 66.666%;
  height: 100%;
`;

export const LeftItems = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.span`
  color: #ffffff;
  margin: 0 1rem;
  padding-top: 0.3rem;
  font-size: 2.5rem;
  font-weight: 700;
`;

export const RightItems = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
`;

export const Item = styled.li`
  color: #ffffff;
  font-size: 1.5rem;
  text-align: center;
  align-items: center;
  min-width: 6.5rem;
  margin: 0 0.5rem;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;
