import styled from 'styled-components';
import { Button } from '../../ui/styles/Button.styles';

export const Wrapper = styled.div`
  width: 448px;
  height: 408px;
  border: 1px solid #aaaaaa;
  margin-top: 84px;
  position: sticky;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 28px 36px;
  }

  > div:first-child {
    margin: 0;
    height: 92px;
    border-bottom: 1px solid #aaaaaa;

    p {
      margin-left: 36px;
    }
  }

  > div:last-of-type {
    margin-top: 52px;

    p {
      font-weight: 900;
    }
  }

  @media screen and (max-width: 1120px) {
    max-width: 660px;
    width: 100%;
  }
`;

export const OrderButton = styled(Button)`
  width: 388px;
  height: 72px;
  background-color: #04c09e;
  color: #ffffff;
  margin: 40px auto;
  font-size: 24px;

  @media screen and (max-width: 1120px) {
    max-width: 388px;
    width: 100%;
  }
`;
