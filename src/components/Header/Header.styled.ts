import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Container = styled.div`
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 70px;

  background-color: var(--grey-100);

  border-bottom: 1px solid var(--grey-200);

  z-index: 100;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 1080px;

  @media screen and (max-width: 1080px) {
    padding: 0 16px;
  }
`;

export const Title = styled(Link)`
  display: flex;
  align-items: center;

  font-size: 24px;
  font-weight: 9000;

  & > span:first-child {
    color: var(--primary-color);
  }
`;

export const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CartPageLink = styled(Link)`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: var(--grey-400);
  font-size: 11px;

  & > span {
    margin-top: 6px;
  }
`;
