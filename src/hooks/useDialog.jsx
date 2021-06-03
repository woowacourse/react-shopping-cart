import { useState } from 'react';

const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [type, setType] = useState(null);

  const onConfirm = (callback) => {
    setIsDialogOpen(false);
    setType(null);
    callback && callback();
  };

  const onCancel = () => {
    setIsDialogOpen(false);
    setType(null);
  };

  return { isDialogOpen, setIsDialogOpen, onConfirm, onCancel, type, setType };
};

export default useDialog;
