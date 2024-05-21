import styles from '../Cart.module.css';
import { PropsWithChildren } from 'react';

export default function CartItem({ children }: PropsWithChildren) {
  return <li className={styles.cartItemContainer}>{children}</li>;
}
