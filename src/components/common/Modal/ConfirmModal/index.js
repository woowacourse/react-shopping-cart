import PropTypes from 'prop-types';
import React from 'react';
import Modal from '..';
import PALETTE from '../../../../constants/palette';
import Button from '../../Button';
import FlexContainer from '../../FlexContainer';

const ConfirmModal = ({ children, onClose, onConfirm }) => {
  return (
    <Modal type="default" isShowCloseButton={false} onClose={onClose}>
      <FlexContainer direction="column">
        {children}
        <FlexContainer justifyContent="space-between" margin="2rem 0 0">
          <Button
            type="button"
            width="45%"
            height="3rem"
            backgroundColor={PALETTE.GRAY_005}
            fontSize="1rem"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            type="button"
            width="45%"
            height="3rem"
            backgroundColor={PALETTE.GREEN}
            fontSize="1rem"
            onClick={onConfirm}
          >
            확인
          </Button>
        </FlexContainer>
      </FlexContainer>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default ConfirmModal;
