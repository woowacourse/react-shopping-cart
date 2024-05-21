import styles from './divider.module.css';
import { PropsWithChildren } from 'react';

export default function Divider({ children }: PropsWithChildren) {
  return <div className={styles.line}>{children}</div>;
}
