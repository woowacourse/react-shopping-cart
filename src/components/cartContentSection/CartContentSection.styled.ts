import styled from "styled-components";

export const StyledCartContentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 680px;
`;

export const StyledContentContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  scrollbar-width: thin;
`;

export const StyledEmptyCartItemCard = styled.span`
  width: 100%;
  margin: auto 0;

  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
  color: rgba(10, 13, 19, 1);
`;
