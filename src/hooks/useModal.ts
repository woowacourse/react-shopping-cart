import { useState } from 'react';

const useModal = (defaultOpen: boolean = false) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(defaultOpen);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, openModal, closeModal };
};

export default useModal;
