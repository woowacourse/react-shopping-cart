import styled from 'styled-components';
import { BREAKPOINTS, COLOR } from '../../../constants';
import '../../../statics/fonts/BMYEONSUNG.css';

export const NavBar = styled.nav`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 5rem;
  background-color: ${COLOR.HEX.CYAN_500};
  box-shadow: 0px 4px 4px rgba(${COLOR.RGB.BLACK}, 0.3);
  z-index: 10;
`;

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  width: 66.666%;
  height: 100%;
`;

export const NavTitle = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  @media screen and (max-width: ${BREAKPOINTS.LAPTOP_S}) {
    display: none;
  }
`;

export const Title = styled.h1`
  font-family: 'BMYEONSUNG';
  color: ${COLOR.HEX.WHITE};
  margin: 0 1rem;
  padding-top: 0.3rem;
  font-size: 2rem;
  font-weight: 700;
`;

export const NavItems = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
`;

export const Item = styled.li`
  position: relative;
  color: ${COLOR.HEX.WHITE};
  font-size: 1.25rem;
  text-align: center;
  align-items: center;
  min-width: 6.5rem;
  margin: 0 1rem;

  &::after {
    content: '${(props) => props.noticeLength}';
    display: ${(props) => (props.noticeLength ? 'inline-block' : 'none')};
    position: absolute;
    top: -0.25rem;
    right: -0.75rem;
    color: ${COLOR.HEX.WHITE};
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.4rem;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 25%;
    background-color: ${COLOR.HEX.VIOLET_500};
    box-shadow: 3px 3px 3px rgba(${COLOR.RGB.BLACK}, 0.25);
  }
`;
