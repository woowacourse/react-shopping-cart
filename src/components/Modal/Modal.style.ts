import styled from "styled-components";

export const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background-color: #fff;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
`;
