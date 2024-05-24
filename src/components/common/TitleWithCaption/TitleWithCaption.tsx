import { PropsWithChildren } from 'react';
import common from '../../../styles/common.module.css';
import styles from './TitleWithCaption.module.css';

interface Props {
  title: string;
}

export default function TitleWithCaption({ title, children }: PropsWithChildren<Props>) {
  return (
    <div className={styles.titleContainer}>
      <h1 className={`${common.titleText} ${styles.marginBottom}`}>{title}</h1>
      {children}
    </div>
  );
}
