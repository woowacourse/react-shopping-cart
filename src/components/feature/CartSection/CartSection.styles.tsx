import styled from "@emotion/styled";

export const Container = styled.div`
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 36px 24px 0;
  gap: 15px;
  position: relative;
`;

export const Description = styled.div`
  font-size: 12px;
`;

export const EmptyCartContainer = styled.div`
  text-size: 16px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
