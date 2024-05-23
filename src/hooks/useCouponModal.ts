import { useState } from 'react';

const useCouponModal = (initialState = false) => {
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(initialState);

  const openModal = () => setIsCouponModalOpen(true);

  const closeModal = () => setIsCouponModalOpen(false);

  const toggleModal = () => setIsCouponModalOpen((prev) => !prev);

  return { isCouponModalOpen, openModal, closeModal, toggleModal };
};

export default useCouponModal;
