import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 82px;
  padding: 10px 0;
  margin-top: 10px;
`;

export const BorderLine = styled.div`
  width: 80%;
  background-color: ${({ theme }) => theme.COLOR["grey"]};
  height: 1px;
  margin-bottom: 10px;
`;

export const FlexBox = styled.div`
  display: flex;
  gap: 10px;
`;
