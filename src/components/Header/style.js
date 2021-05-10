import styled from 'styled-components';
import { COLOR } from '../../constants';

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: ${COLOR.MINT};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
  height: 100%;
  margin: 0 auto;

  & a {
    color: ${COLOR.WHITE};
    padding: 0 20px;
    font-size: 1.5rem;
    color: ${COLOR.WHITE};
    cursor: pointer;
    text-decoration: none;

    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
  }
`;
