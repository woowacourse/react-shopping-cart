import { Modal } from 'nakta-react-payments-components';
import { useRecoilState } from 'recoil';

import CouponList from './CouponList';
import InformationText from '../common/InformationText';

import { isCouponModalOpenState } from '@recoil/coupon/atom';

export default function CouponModal() {
  const [isCouponModalOpen, setIsCouponModalOpen] = useRecoilState(isCouponModalOpenState);

  const onClose = () => setIsCouponModalOpen(false);

  return (
    <Modal position="center" isOpen={isCouponModalOpen} onClose={onClose}>
      <Modal.Backdrop onClick={onClose} />
      <Modal.Content size="small">
        <Modal.Header>
          <Modal.Title>쿠폰을 선택해주세요</Modal.Title>
          <Modal.CloseButton onClick={onClose} />
        </Modal.Header>
        <Modal.Main>
          <Modal.Label color="basic">
            <InformationText>쿠폰은 최대 2개까지 사용할 수 있습니다.</InformationText>
          </Modal.Label>
          <CouponList />
        </Modal.Main>
        <Modal.Footer align="row" position="right">
          <Modal.Button backgroundColor="primary" onClick={onClose} size="full">
            총 120,000원 할인 쿠폰 사용하기
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
