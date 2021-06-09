import React from 'react';
import PropTypes from 'prop-types';

import Modal from '.';
import HighlightText from '../HighlightText';

import PALETTE from '../../../constants/palette';
import ErrorImage from '../../../assets/error.png';

import * as Styled from './ErrorModal.style';

const ErrorModal = ({ textContent, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <Styled.ModalInner>
        {<img src={ErrorImage} alt="Error image" />}
        <HighlightText fontSize="1.5rem" margin="3rem 0" highlightColor={PALETTE.BAEMINT}>
          {textContent}
        </HighlightText>
      </Styled.ModalInner>
    </Modal>
  );
};

ErrorModal.propTypes = {
  textContent: PropTypes.string,
  onClose: PropTypes.func,
};

export default ErrorModal;
