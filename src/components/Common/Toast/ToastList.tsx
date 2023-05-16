import { useRecoilValue } from 'recoil';
import { $ToastMessageList } from '../../../recoil/atom';
import styles from './index.module.scss';
import Toast from '.';
import { createPortal } from 'react-dom';

const ToastList = () => {
  const messageList = useRecoilValue($ToastMessageList);

  return createPortal(
    <div className={styles['toast-list-container']}>
      {messageList.map((message, index) => (
        <Toast message={message} key={index} />
      ))}
    </div>,
    document.body
  );
};

export default ToastList;
