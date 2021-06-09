import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '.';
import HighlightText from '../HighlightText';

import PALETTE from '../../../constants/palette';
import ErrorImage from '../../../assets/error.png';
import { resetErrorMessage } from '../../../redux/ErrorMessage/actions';

import * as Styled from './ErrorModal.style';

const ErrorModal = () => {
  const { errorMessage } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onCloseErrorMessageModal = () => {
    dispatch(resetErrorMessage());
  };

  return (
    errorMessage && (
      <Modal onClose={onCloseErrorMessageModal}>
        <Styled.ModalInner>
          {<img src={ErrorImage} alt="Error image" />}
          <HighlightText fontSize="1.5rem" margin="3rem 0" highlightColor={PALETTE.BAEMINT}>
            {errorMessage}
          </HighlightText>
        </Styled.ModalInner>
      </Modal>
    )
  );
};

ErrorModal.propTypes = {
  textContent: PropTypes.string,
  onClose: PropTypes.func,
};

export default ErrorModal;
