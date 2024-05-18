import styles from '../Cart.module.css';
import { PropsWithChildren } from 'react';

export default function CartWrapper({ children }: PropsWithChildren) {
  return <div className={styles.cartBodyWrapper}>{children}</div>;
}
