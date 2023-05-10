import { KeyboardEvent, useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalClosePress = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  return [isModalOpen, handleModalOpen, handleModalClose, handleModalClosePress] as const;
};

export { useModal };
