import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 80px;

  background-color: #333333;
  color: #ffffff;
`;

export const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

export const TitleHeading = styled.h1`
  display: flex;

  width: 145px;
  height: 57px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 900;
  font-size: 40px;

  line-height: 58px;
  text-align: center;
`;

export const CartButton = styled.button`
  display: flex;
  column-gap: 10px;

  align-items: center;
  text-align: center;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 12px;

  color: #ffffff;
`;

export const CartLengthDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;

  border-radius: 50%;
  background-color: #04c09e;
  text-align: center;

  font-size: 16px;
`;
