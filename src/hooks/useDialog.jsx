import React, { useState } from 'react';

const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const clickConfirm = (callback) => {
    setIsDialogOpen(false);
    callback && callback();
  };

  const clickCancel = () => {
    setIsDialogOpen(false);
  };

  return { isDialogOpen, setIsDialogOpen, clickConfirm, clickCancel };
};

export default useDialog;
