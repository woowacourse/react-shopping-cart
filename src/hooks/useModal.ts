import { KeyboardEvent, useCallback, useState } from 'react';

import { ESC_KEY } from '../constants';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleModalClosePress = useCallback((event: KeyboardEvent<HTMLElement>) => {
    if (event.key === ESC_KEY) {
      setIsModalOpen(false);
    }
  }, []);

  return { isModalOpen, handleModalOpen, handleModalClose, handleModalClosePress };
};

export { useModal };
