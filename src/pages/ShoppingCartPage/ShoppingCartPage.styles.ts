import styled from "@emotion/styled";

export const StyledShoppingCart = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  overflow: scroll;
  height: 686px;
  margin-top: 64px;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
`;

export const Checkbox = styled.input`
  width: 24px;
  height: 24px;
  accent-color: black;
`;

export const EmptyText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 750px;
  font-size: 16px;
  font-weight: 400;
`;
