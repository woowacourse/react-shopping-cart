import CloseIcon from '@/asset/close.png';
import { ButtonHTMLAttributes } from 'react';
import styles from './closeButton.module.css';
import Button from '../common/Button';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function CloseButton({ ...props }: Props) {
  return (
    <Button {...props} type="button">
      <img
        src={CloseIcon}
        className={styles.close_button}
        width={14}
        height={14}
        alt="닫기 아이콘"
      />
    </Button>
  );
}
