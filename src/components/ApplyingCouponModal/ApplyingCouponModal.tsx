import * as Styled from './style';

import { useRecoilState, useRecoilValue } from 'recoil';
import { isApplyingCouponModalOpenState } from '../../recoil/atoms';
import { couponsSelector } from '../../recoil/selectors';

import CaptionEmoji from '../../assets/CaptionEmoji.svg';

import { Modal } from 'simodal';
import Caption from '../Caption/Caption';
import Coupon from '../Coupon/Coupon';

import { CouponType } from '../../type';

const ApplyingCouponModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    isApplyingCouponModalOpenState,
  );
  const coupons = useRecoilValue(couponsSelector);

  const closeModal = () => setIsModalOpen(false);

  return (
    <Modal isOpen={isModalOpen}>
      <>
        <Modal.BackDrop onClose={closeModal} />
        <Modal.Container size="small" position="center">
          <>
            <Modal.Header>
              <>
                <Modal.Title text="쿠폰을 선택해 주세요" />
                <Modal.CloseButton onCloseButtonClick={closeModal} />
              </>
            </Modal.Header>
            <Styled.ModalContent>
              <Caption>
                <img src={CaptionEmoji} />
                쿠폰은 최대 2개까지 사용할 수 있습니다.
              </Caption>
              <Styled.Coupons>
                {coupons.map((coupon: CouponType) => {
                  return <Coupon key={coupon.id} inputCoupon={coupon} />;
                })}
              </Styled.Coupons>
            </Styled.ModalContent>
            <Modal.ButtonContainer direction="row" position="center">
              <>
                <Modal.Button color="dark" size="large" onClick={closeModal}>
                  <span>총 6,000원 할인 쿠폰 사용하기</span>
                </Modal.Button>
              </>
            </Modal.ButtonContainer>
          </>
        </Modal.Container>
      </>
    </Modal>
  );
};

export default ApplyingCouponModal;
