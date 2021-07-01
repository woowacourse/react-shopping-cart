import React from 'react';
import PropTypes from 'prop-types';

import Modal from '.';
import HighlightText from '../HighlightText';

import PALETTE from '../../../constants/palette';
import ErrorImage from '../../../assets/error.png';

import * as Styled from './ErrorModal.style';

const ErrorModal = ({ errorMessage, closeModal }) =>
  errorMessage && (
    <Modal onClose={closeModal}>
      <Styled.ModalInner>
        {<img src={ErrorImage} alt="Error image" />}
        <HighlightText fontSize="1.5rem" margin="3rem 0" highlightColor={PALETTE.BAEMINT}>
          {errorMessage}
        </HighlightText>
      </Styled.ModalInner>
    </Modal>
  );

ErrorModal.propTypes = {
  errorMessage: PropTypes.string,
  closeModal: PropTypes.func,
};

export default ErrorModal;
