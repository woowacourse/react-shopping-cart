import styled from 'styled-components';

export const StyledCartPage = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  & > h1 {
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 5px solid #333333;
    text-align: center;
  }
`;

export const StyledFlexBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  @media screen and (max-width: 1000px) {
    flex-direction: column;

    section {
      width: 100%;
    }
  }
`;
