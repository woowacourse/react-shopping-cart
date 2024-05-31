import { ReactNode } from 'react';
import Text from '../Text/Text';
import noticeIcon from '../../../asset/noticeIcon.png';
import styles from './NoticeLabel.module.css';

interface Props {
  children: ReactNode;
}

export default function NoticeLabel({ children }: Props) {
  return (
    <div className={styles.noticeLabelWrapper}>
      <img src={noticeIcon} width={13} height={13} />
      <Text.Label>{children}</Text.Label>
    </div>
  );
}
