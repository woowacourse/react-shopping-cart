export const useConfirm = (
  message = "",
  fulfill = () => {},
  rejection = () => {}
) => {
  const confirmAction = () => {
    if (window.confirm(message)) {
      fulfill();
    } else {
      rejection();
    }
  };

  return confirmAction;
};
