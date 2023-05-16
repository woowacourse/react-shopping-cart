import { useRecoilValue } from 'recoil';
import { $ToastMessageList } from '../../../recoil/atom';
import styles from './index.module.scss';
import Toast from '.';

const ToastList = () => {
  const messageList = useRecoilValue($ToastMessageList);

  return (
    <div className={styles['toast-list-container']}>
      {messageList.map(message => (
        <Toast message={message} />
      ))}
    </div>
  );
};

export default ToastList;
