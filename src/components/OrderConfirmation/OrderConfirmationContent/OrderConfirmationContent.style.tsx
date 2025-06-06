import styled from "@emotion/styled";

export const Container = styled.article`
  width: 100%;
  height: calc(100% - 128px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  margin-top: 64px;
  justify-content: flex-start;
`;

export const Header = styled.h2`
  font-weight: 700;
  font-size: 24px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Description = styled.p`
  font-weight: 500;
  font-size: 12px;
`;
