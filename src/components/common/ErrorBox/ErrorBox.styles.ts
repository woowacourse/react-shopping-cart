import styled from "@emotion/styled";

export const Container = styled.div`css
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 450px;
  height: 40px;
  background-color: #ffc9c9;
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);

  span {
    font-weight: 500;
    font-size: 12px;
    color: #0a0d13;
  }
`;
