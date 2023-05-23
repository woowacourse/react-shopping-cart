import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { errorModalMessageState } from '../../../store/error';
import Modal from '../Modal/Modal';
import * as S from './ErrorModal.styles';

const ErrorModal = () => {
  const [errorMessage, setErrorMessage] = useRecoilState(errorModalMessageState);

  const handleClose = useCallback(() => {
    setErrorMessage(null);
  }, [setErrorMessage]);

  return (
    <Modal isOpen={!!errorMessage} handleClose={handleClose}>
      <S.ErrorModalContentContainer>
        <S.ErrorMessage id="modal-description">{errorMessage}</S.ErrorMessage>
        <S.ErrorModalCloseButton aria-label="모달 닫기" variant="textButton" onClick={handleClose}>
          확인
        </S.ErrorModalCloseButton>
      </S.ErrorModalContentContainer>
    </Modal>
  );
};

export default ErrorModal;
