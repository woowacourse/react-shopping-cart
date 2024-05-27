import { useState } from 'react';

const useModalControl = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  return { isModalOpen, handleModalOpen };
};

export default useModalControl;
