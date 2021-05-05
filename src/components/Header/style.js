import styled from 'styled-components';
import PALETTE from '../../constants/palette';

export const Header = styled.header`
  height: 5rem;
  background-color: ${PALETTE.BAEMINT};
  padding: 0 1.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;

export const HeaderInner = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1300px;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.div`
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
