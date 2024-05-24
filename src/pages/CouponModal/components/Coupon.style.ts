import styled from "styled-components";

export const Wrapper = styled.div<{ disabled: boolean }>`
  width: 100%;
  height: 82px;
  padding: 10px 0;
  margin-top: 10px;
  color: ${({ disabled, theme }) => disabled && theme.COLOR["grey-2"]};
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
