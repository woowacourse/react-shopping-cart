import { useState } from 'react';

const useConfirmModal = () => {
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

  return {
    isConfirmModalShown,
    confirmModalMessage,
    confirmAction,
    showConfirmModal,
    hideConfirmModal,
    changeConfirmAction,
  };
};

export default useConfirmModal;
