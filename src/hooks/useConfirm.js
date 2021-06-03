// eslint-disable-next-line import/prefer-default-export
export const useConfirm = (
  message = "",
  fulfill = () => {},
  rejection = () => {}
) => {
  const confirmAction = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(message)) {
      fulfill();
    } else {
      rejection();
    }
  };

  return confirmAction;
};
