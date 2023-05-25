import styled from 'styled-components';

export const StyledCartListSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 52%;
  height: 100%;

  @media screen and (max-width: 1000px) {
    height: 50%;
  }
`;

export const StyledCartListTextBox = styled.div`
  margin-bottom: 16px;
  padding: 24px 0;

  text-align: start;
  border-bottom: 4px solid #aaaaaa;
`;

export const StyledCartListFlexBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
`;
