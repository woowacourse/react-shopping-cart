import { useState } from 'react';

export const useToast = () => {
  const [isOpenToast, setIsOpenToast] = useState(false);

  const openToast = () => setIsOpenToast(true);
  const closeToast = () => setIsOpenToast(false);

  return { isOpenToast, openToast, closeToast };
};
