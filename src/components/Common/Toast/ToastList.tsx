import { useRecoilValue } from 'recoil';
import { $ToastStateList } from '../../../recoil/atom';
import styles from './index.module.scss';
import Toast from '.';
import { createPortal } from 'react-dom';

const ToastList = () => {
  const toastState = useRecoilValue($ToastStateList);

  return createPortal(
    <div className={styles['toast-list-container']}>
      {toastState.map(({ type, message }, index) => (
        <Toast type={type} message={message} key={index + message} />
      ))}
    </div>,
    document.body
  );
};

export default ToastList;
