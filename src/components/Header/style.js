import Styled from 'styled-components';
import PALETTE from '../../constants/palette';

export const Header = Styled.header`
  height: 80px;
  background-color: ${PALETTE.BAEMINT};
  padding: 0 25px;
`;

export const HeaderInner = Styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1300px;
  height: 100%;
  align-items: center;
`;

export const HeaderTitle = Styled.div`
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${PALETTE.WHITE};
  
  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
  }
`;
