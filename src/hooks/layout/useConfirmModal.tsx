import { useState } from 'react';
import ConfirmModal from '../../components/commons/Modal/ConfirmModal/ConfirmModal';

const useConfirmModal = (
  cancelButtonText: string | undefined = '취소',
  confirmButtonText: string | undefined = '확인'
) => {
  const [isConfirmModalShown, setIsConfirmModalShown] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState('');

  const hideConfirmModal = () => {
    setIsConfirmModalShown(false);
  };

  const [confirmAction, setConfirmAction] = useState(() => hideConfirmModal);

  const showConfirmModal = (message: string) => {
    setIsConfirmModalShown(true);
    setConfirmModalMessage(message);
  };

  const changeConfirmAction = (newConfirmAction: () => void) => {
    setConfirmAction(() => () => {
      newConfirmAction();
      hideConfirmModal();
    });
  };

  const ConfirmModalContainer = () => (
    <>
      {isConfirmModalShown && (
        <ConfirmModal
          cancelButtonText={cancelButtonText}
          confirmButtonText={confirmButtonText}
          heading={confirmModalMessage}
          onCancel={hideConfirmModal}
          onClose={hideConfirmModal}
          onConfirm={confirmAction}
        />
      )}
    </>
  );

  return {
    isConfirmModalShown,
    confirmModalMessage,
    confirmAction,
    showConfirmModal,
    hideConfirmModal,
    changeConfirmAction,
    ConfirmModalContainer,
  };
};

export default useConfirmModal;
