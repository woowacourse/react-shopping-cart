import styles from './index.module.scss';

function LoadingView() {
  return (
    <div className={styles.container}>
      <div className={`${styles.dash} ${styles.one}`} />
      <div className={`${styles.dash} ${styles.two}`} />
      <div className={`${styles.dash} ${styles.three}`} />
      <div className={`${styles.dash} ${styles.four}`} />
    </div>
  );
}

export default LoadingView;
