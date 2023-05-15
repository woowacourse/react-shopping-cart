import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 80px;

  padding: 10px 100px;

  background-color: #333333;

  @media screen and (max-width: 650px) {
    padding: 10px 50px;
  }
`;

export const StyledTitleDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 28px;

  cursor: pointer;

  @media screen and (max-width: 450px) {
    & > h1 {
      display: none;
    }
  }
`;

export const StyledCartFlexBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  cursor: pointer;

  @media screen and (max-width: 450px) {
    & > p {
      display: none;
    }
  }
`;
