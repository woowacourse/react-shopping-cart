import { ReactNode } from 'react';
import noticeIcon from '../../../asset/noticeIcon.png';
import common from '../../../styles/common.module.css';
import styles from './NoticeLabel.module.css';

interface Props {
  children: ReactNode;
}

export default function NoticeLabel({ children }: Props) {
  return (
    <div className={styles.noticeLabelWrapper}>
      <img src={noticeIcon} width={13} height={13} />
      <span className={common.labelText}>{children}</span>
    </div>
  );
}
