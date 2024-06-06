import styled from "styled-components";

export const StyledContentHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 12px;
  width: 100%;
`;

export const StyledContentHeaderTitle = styled.span`
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  text-align: left;
  color: rgba(0, 0, 0, 1);
`;

export const StyledContentHeaderDescription = styled.span`
  height: 36px;

  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  color: rgba(10, 13, 19, 1);
  white-space: pre-line;
`;
