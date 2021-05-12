import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  box-shadow: 5px 5px 20px 0 rgb(0 0 0 / 50%);
  width: 304px;
  border-radius: 5px;
  background-color: white;
  line-height: 1.33333;
  letter-spacing: -0.6px;

  & button {
    width: 50%;
    height: 60px;
    border-top: 1px solid rgb(221, 221, 221);
    cursor: pointer;

    &:hover {
      background-color: rgb(246, 246, 246);
    }
  }
`;

const TextWrapper = styled.section`
  padding: 40px 28px;
`;

const LeftButton = styled.button`
  border: none;
  border-right: 1px solid rgb(221, 221, 221);
`;

const RightButton = styled.button`
  border: none;
  font-weight: 600;
`;

const Dialog = ({ children, onConfirm, onCancel }) => (
  <Container>
    <Content>
      <TextWrapper>{children}</TextWrapper>
      <section>
        <LeftButton onClick={onCancel}>취소</LeftButton>
        <RightButton onClick={onConfirm}>확인</RightButton>
      </section>
    </Content>
  </Container>
);

export default Dialog;
