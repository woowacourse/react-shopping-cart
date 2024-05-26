import { COUPON_MESSAGE } from '@/constants/message';
import CloseIcon from '@/assets/close.svg?react';
import CouponConfirmButton from './CouponConfirmButton';
import CouponList from './CouponList';
import { FlexRow } from '@/style/common.style';
import Info from '@/assets/Info.svg?react';
import { Modal } from 'styled-base-modal';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CouponModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} position="center" onClose={onClose}>
      <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
      <Modal.CloseIcon onClick={onClose}>
        <CloseIcon />
      </Modal.CloseIcon>
      <Modal.Content>
        <StyledInfoBox>
          <Info />
          {COUPON_MESSAGE.maxCouponInfo}
        </StyledInfoBox>
        <CouponList />
      </Modal.Content>
      <CouponConfirmButton onClick={onClose} />
    </Modal>
  );
};

export default CouponModal;

const StyledInfoBox = styled.div`
  ${FlexRow}
  align-items: flex-start;
  font-size: ${theme.fontSize.xsmall};
  gap: 5px;
`;
