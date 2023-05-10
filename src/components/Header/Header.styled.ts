import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 80px;

  padding: 10px 100px;

  background-color: #333333;
  color: #ffffff;

  @media screen and (max-width: 650px) {
    padding: 10px 50px;
  }
`;

export const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 28px;
`;

export const TitleHeading = styled.h1`
  display: flex;

  width: 145px;
  height: 57px;

  text-align: center;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 900;
  font-size: 40px;

  line-height: 58px;

  @media screen and (max-width: 450px) {
    font-size: 1.5rem;
  }
`;

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

  color: #ffffff;

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
  background-color: #04c09e;
  text-align: center;

  font-size: 16px;
`;
