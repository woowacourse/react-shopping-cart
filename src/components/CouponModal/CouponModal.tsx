import { Suspense, useState } from 'react';
import { Modal } from 'chico-custom-modal';
import styled from 'styled-components';
import CouponModalContent from './CouponModalContent';
import { NoCartItemContainer } from '../CartContent/CartContent';
import {
  allCheckedCouponsSelector,
  totalDiscountSelector,
} from '../../recoil/selectors';
import { useRecoilValue } from 'recoil';
import { MESSAGES_PROPS } from '../../constants/Messages';
import { ResetAllCoupons } from '../../recoil/useRecoilCallback';

const Button = styled.button`
  height: 4.2rem;
  border-radius: 5px;
  font-weight: 700;
  font-size: 1.5rem;
  background: white;

  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

function CouponModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { totalDiscount, isFreeShipping } = useRecoilValue(
    totalDiscountSelector,
  );
  const allCheckedCoupons = useRecoilValue(allCheckedCouponsSelector);
  const resetAllCoupons = ResetAllCoupons();

  const handleButton = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    resetAllCoupons();
    setIsModalOpen(false);
  };
  const handleConfirm = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={handleButton}>쿠폰적용</Button>
      {isModalOpen && (
        <Modal position="center" size="large" onDimmedClick={handleClose}>
          <Modal.Header>
            <Modal.Title title="쿠폰을 선택해 주세요" />
            <Modal.XButton onClick={handleClose}></Modal.XButton>
          </Modal.Header>
          <Modal.Body>
            <Suspense
              fallback={<NoCartItemContainer>Loading...</NoCartItemContainer>}
            >
              <CouponModalContent />
            </Suspense>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Button
              disabled={allCheckedCoupons.length === 0}
              onClick={handleConfirm}
              width="stretch"
            >
              {MESSAGES_PROPS.couponConfirm(totalDiscount, isFreeShipping)}
            </Modal.Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default CouponModal;
