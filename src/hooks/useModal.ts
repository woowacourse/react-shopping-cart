import { KeyboardEvent, useCallback, useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleModalClosePress = useCallback((event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      setIsModalOpen(false);
    }
  }, []);

  return [isModalOpen, handleModalOpen, handleModalClose, handleModalClosePress] as const;
};

export { useModal };
