import { useState } from 'react';

const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [type, setType] = useState(null);

  const clickConfirm = (callback) => {
    setIsDialogOpen(false);
    setType(null);
    callback && callback();
  };

  const clickCancel = () => {
    setIsDialogOpen(false);
    setType(null);
  };

  return { isDialogOpen, setIsDialogOpen, clickConfirm, clickCancel, type, setType };
};

export default useDialog;
