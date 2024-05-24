import { PropsWithChildren } from 'react';
import styles from './CaptionText.module.css';

export default function CaptionText({ children }: PropsWithChildren) {
  return <span className={styles.captionText}>{children}</span>;
}
