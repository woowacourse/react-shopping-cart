import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #888;
`;

const LayoutWrapper = styled.div`
  width: 430px;
  height: calc(100vh - 64px);
  min-height: 100%;
  margin-top: 64px;
  position: relative;

  overflow-y: scroll;

  background-color: white;
  color: black;
`;

const Styled = {
  Wrapper,
  LayoutWrapper,
};

export default Styled;
