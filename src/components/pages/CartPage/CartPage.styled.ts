import styled from 'styled-components';

export const StyledCartPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  padding: 0 100px;

  & > h1 {
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 5px solid #333333;
    text-align: center;
  }
`;

export const StyledFlexBox = styled.div`
  display: flex;
  column-gap: 150px;

  width: 100%;
`;
