import FlexBox from 'components/@common/FlexBox';
import Modal from 'components/@common/Modal/Modal';
import type { ModalProps } from 'components/@common/Modal/Modal';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ConfirmModalProps extends ModalProps {
  onClickConfirmButton: () => void;
}

const ConfirmModal = ({ children, isOpen, closeModal, onClickConfirmButton }: PropsWithChildren<ConfirmModalProps>) => {
  const handleConfirm = () => {
    onClickConfirmButton();
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Container flexDirection="column">
        <MessageWrapper>{children}</MessageWrapper>
        <ButtonContainer>
          <Button onClick={closeModal}>취소</Button>
          <Button onClick={handleConfirm}>확인</Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

export default ConfirmModal;

const Container = styled(FlexBox)`
  width: 300px;
  min-height: 100px;
`;

const MessageWrapper = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.4px;
  padding: 40px 28px;
  text-align: center;
`;

const ButtonContainer = styled(FlexBox)`
  width: 100%;
  height: 50px;
  border-top: 1px solid #eeeeee;

  button:first-child {
    border-right: 1px solid #eeeeee;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
