import { useState } from 'react';

const useToast = () => {
  const [isShowToast, setIsShowToast] = useState(false);

  const showToast = () => setIsShowToast(true);
  const dismissToast = () => setIsShowToast(false);

  return { isShowToast, showToast, dismissToast };
};

export default useToast;
