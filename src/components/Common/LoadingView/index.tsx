import styles from './index.module.scss';

function LoadingView() {
  return (
    <div className={styles.container}>
      <div className={`${styles.dash} ${styles.one}`}></div>
      <div className={`${styles.dash} ${styles.two}`}></div>
      <div className={`${styles.dash} ${styles.three}`}></div>
      <div className={`${styles.dash} ${styles.four}`}></div>
    </div>
  );
}

export default LoadingView;
