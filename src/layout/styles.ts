import styled from "@emotion/styled";

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
`;

export const Content = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacer.spacing4};
  margin-bottom: 50px;
  overflow-y: auto;
`;

export const BottomWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  width: 430px;
  z-index: 1000;
  background-color: white;
`;
