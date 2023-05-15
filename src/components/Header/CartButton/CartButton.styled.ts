import styled from 'styled-components';
import Colors from '../../../constants/Colors';

export const CartButton = styled.button`
  display: flex;
  align-items: center;
  column-gap: 10px;

  text-align: center;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 12px;

  color: ${Colors.FONT_WHITE};

  @media screen and (max-width: 450px) {
    & > p {
      display: none;
    }

    & > div {
      width: 40px;
      height: 40px;
    }
  }
`;

export const CartLengthDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;

  border-radius: 50%;
  background-color: ${Colors.PRIMARY_COLOR_HIGHLIGHT};
  text-align: center;

  font-size: 16px;
`;
