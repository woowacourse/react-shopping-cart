import styled from "styled-components";

export const StyledCartContentSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 710px;
`;

export const StyledContentContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  scrollbar-width: thin;
`;

export const StyledEmptyCartItemCard = styled.span`
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
  color: rgba(10, 13, 19, 1);
`;
