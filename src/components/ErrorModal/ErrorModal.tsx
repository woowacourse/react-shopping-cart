import { Link } from 'react-router-dom';

import {
  StyledBackdrop,
  StyledContentSection,
  StyledErrorModal,
} from './ErrorModal.styled';
import Modal from '@components/commons/Modal/Modal';
import Button from '@components/commons/Button/Button';

const ErrorModal = (props: { isError: boolean }) => {
  const { isError } = props;

  return (
    <Modal initIsOpenModal={isError}>
      {handleModalClose => (
        <StyledErrorModal>
          <StyledBackdrop onClick={() => handleModalClose()} />
          <StyledContentSection>
            <h1>데이터를 불러오는 데에 실패했습니다 😢</h1>
            <Link to="/">
              <Button
                padding="20px"
                borderRadius="8px"
                backgroundColor="#04c09e"
                color="white"
                fontSize="20px"
                type="button"
              >
                다시 불러오기
              </Button>
            </Link>
          </StyledContentSection>
        </StyledErrorModal>
      )}
    </Modal>
  );
};

export default ErrorModal;
