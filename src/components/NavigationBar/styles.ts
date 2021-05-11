import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PALETTE from '../../constants/palette';
import { INNER_TEMPLATE_WIDTH } from '../../constants/style';

export const NavigationBarContainer = styled.div`
  background-color: ${PALETTE.BAE_MINT[500]};
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;

export const NavigationBarInnerContainer = styled.div`
  width: ${INNER_TEMPLATE_WIDTH};
  min-width: ${INNER_TEMPLATE_WIDTH};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  color: white;
  font-size: 2.5rem;
  justify-content: space-between;
  align-items: center;

  img {
    width: 3rem;
    margin-right: 1.25rem;
  }
`;

export const StyledLink = styled(Link)`
  color: white;
  margin-left: 1.5rem;
  position: relative;
  z-index: 1;
  padding: 0.75rem;
  font-size: 1.25rem;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    z-index: -1;
    transition: all ease-in 0.07s;
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.05);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08) inset;
  }

  &:active::after {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
