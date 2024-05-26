import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 210px);
  width: 100%;
  text-align: center;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 18px;
  margin-top: 24px;
  margin-bottom: 27px;
`;

export const Price = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
