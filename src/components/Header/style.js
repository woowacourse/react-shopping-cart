import styled from 'styled-components';
import { PC_WIDTH } from '../../constants/appInfo';
import PALETTE from '../../constants/palette';

export const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 5rem;
  background-color: ${PALETTE.BAEMINT};
  padding: 0 1.5rem;
  box-shadow: 0px 4px 4px ${PALETTE.BLACK_TRANSPARENT_007};
`;

export const HeaderInner = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: ${PC_WIDTH};
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLogoIcon = styled.span``;
export const HeaderLogoText = styled.h1``;

export const HeaderTitle = styled.span`
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${PALETTE.WHITE};
  cursor: pointer;

  ${HeaderLogoText},
  ${HeaderLogo} {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
  }

  ${HeaderLogoText} {
    font-size: 2.5rem;
    color: ${PALETTE.WHITE};
  }
`;
