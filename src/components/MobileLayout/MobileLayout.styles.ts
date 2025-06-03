import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const SidePanel = styled.aside`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.75rem;
  background-color: rgb(235, 236, 255);
`;

export const SidePanelText = styled.span`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 0 0 500px;
  background-color: #fff;
  overflow-y: auto;
  height: 100vh;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
