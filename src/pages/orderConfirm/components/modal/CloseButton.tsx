import CloseIcon from '@/asset/close.png';
import { ImgHTMLAttributes } from 'react';
import styles from './closeButton.module.css';

type Props = ImgHTMLAttributes<HTMLImageElement>;

export default function CloseButton({ ...props }: Props) {
  return (
    <img
      {...props}
      src={CloseIcon}
      className={styles.close_button}
      width={14}
      height={14}
      alt="닫기 아이콘"
    />
  );
}
