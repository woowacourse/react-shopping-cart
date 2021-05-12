import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLOR } from '../../constants/color';
import DialogPortal from '../../DialogPortal';

export const DIALOG_TYPE = Object.freeze({
  ALERT: 'ALERT',
  CONFIRM: 'CONFIRM',
});

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
  background-color: ${COLOR.WHITE};
  line-height: 1.33333;
  letter-spacing: -0.6px;

  & button {
    width: ${({ type }) => (type === DIALOG_TYPE.ALERT ? '100%' : '50%')};
    height: 60px;
    border-top: 1px solid ${COLOR.GRAY_200};
    cursor: pointer;

    &:hover {
      background-color: ${COLOR.GRAY_100};
    }
  }
`;

const TextWrapper = styled.section`
  padding: 40px 28px;
`;

const CancelButton = styled.button`
  border: none;
  border-right: 1px solid ${COLOR.GRAY_200};
`;

const ConfirmButton = styled.button`
  border: none;
  font-weight: 600;
`;

const getButton = ({ type, onConfirm, onCancel }) => {
  const dialogType = {
    ALERT: <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>,
    CONFIRM: (
      <>
        <CancelButton onClick={onCancel}>취소</CancelButton>
        <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
      </>
    ),
  };

  return dialogType[type];
};

const Dialog = ({ children, type, onConfirm, onCancel }) => (
  <DialogPortal>
    <Container>
      <Content type={type}>
        <TextWrapper>{children}</TextWrapper>
        <section>{getButton({ type, onConfirm, onCancel })}</section>
      </Content>
    </Container>
  </DialogPortal>
);

Dialog.defaultProps = {
  type: DIALOG_TYPE.CONFIRM,
};

Dialog.propTypes = {
  type: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Dialog;
