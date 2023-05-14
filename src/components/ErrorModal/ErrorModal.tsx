import { Link } from 'react-router-dom';

import {
  StyledBackdrop,
  StyledContentSection,
  StyledErrorModal,
} from './ErrorModal.styled';
import { StyledHomeEntryButton } from '@components/pages/ErrorPage/ErrorPage.styled';
import Modal from '@components/commons/Modal/Modal';

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
              <StyledHomeEntryButton type="button">
                다시 불러오기
              </StyledHomeEntryButton>
            </Link>
          </StyledContentSection>
        </StyledErrorModal>
      )}
    </Modal>
  );
};

export default ErrorModal;
