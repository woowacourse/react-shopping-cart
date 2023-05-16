import { useState } from 'react';

const useCartQuantityStepper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openStepper = () => {
    setIsOpen(true);
  };

  const closeStepper = () => {
    setIsOpen(false);
  };

  return { isOpen, openStepper, closeStepper };
};

export default useCartQuantityStepper;
