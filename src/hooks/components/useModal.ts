import { useState } from 'react';

const useModal = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const handleModalOpen = () => {
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  return { modalOpened, handleModalOpen, handleModalClose };
};

export default useModal;
