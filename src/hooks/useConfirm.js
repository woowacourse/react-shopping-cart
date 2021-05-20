import { useSelector, useDispatch } from 'react-redux';
import { confirmAction } from '../redux';

export const useConfirm = () => {
  const { isOpened, message, approve } = useSelector(({ confirmReducer }) => confirmReducer);

  const dispatch = useDispatch();
  const openConfirmWith = ({ message, approve }) =>
    dispatch(confirmAction.openConfirm({ message, approve }));
  const onApprove = () => {
    approve();
    dispatch(confirmAction.closeConfirm());
  };
  const onCancle = () => dispatch(confirmAction.closeConfirm());

  return { isOpened, message, openConfirmWith, onApprove, onCancle };
};
