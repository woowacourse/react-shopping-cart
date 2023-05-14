import Modal from '@components/commons/Modal/Modal';
import {
  StyledBackdrop,
  StyledContentSection,
  StyledErrorModal,
} from './ErrorModal.styled';

const ErrorModal = (props: { isError: boolean }) => {
  const { isError } = props;

  return (
    <Modal initIsOpenModal={isError}>
      {handleModalClose => (
        <StyledErrorModal>
          <StyledBackdrop onClick={() => handleModalClose()} />
          <StyledContentSection></StyledContentSection>;
        </StyledErrorModal>
      )}
    </Modal>
  );
};

export default ErrorModal;
