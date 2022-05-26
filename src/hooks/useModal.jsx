import { useCallback, useState } from 'react';

export const useModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  const toggleModal = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, [setModalOpen]);

  return { isModalOpen, openModal, closeModal, toggleModal };
};
