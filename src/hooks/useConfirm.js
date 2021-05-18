import { useDispatch, useSelector } from 'react-redux';
import { confirmAction } from '../redux';

export const useConfirm = () => {
  const { isOpen, message, approve } = useSelector(({ confirmReducer }) => confirmReducer);

  const dispatch = useDispatch();
  const openConfirm = ({ message, approve }) =>
    dispatch(confirmAction.openConfirm({ message, approve }));
  const closeConfirm = () => dispatch(confirmAction.closeConfirm());

  const onCancel = () => closeConfirm();
  const onApprove = () => {
    approve();
    closeConfirm();
  };

  return { isOpen, message, openConfirm, close: closeConfirm, onApprove, onCancel };
};
