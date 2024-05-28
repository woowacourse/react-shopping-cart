import { Modal } from '@pakxe/react-simple-modal';
import CouponListModalLoader from './CouponListModalLoader';
import CouponListModalMain from './CouponListModalMain';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from '../ErrorComponent/ErrorComponent';

type CouponListModalProps = {
  isOpen: boolean;
  close: () => void;
};

const CouponListModal = ({ isOpen, close }: CouponListModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} close={close} size="md" style={{ margin: '20px', padding: '24px 32px' }}>
        <Modal.Header>
          <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
          <Modal.CloseButton close={close} />
        </Modal.Header>
        <ErrorBoundary FallbackComponent={ErrorComponent}>
          <CouponListModalLoader>
            <CouponListModalMain close={close} />
          </CouponListModalLoader>
        </ErrorBoundary>
      </Modal>
    </>
  );
};

export default CouponListModal;
