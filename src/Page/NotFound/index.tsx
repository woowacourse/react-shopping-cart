import styles from './index.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h2>해당 페이지를 찾지 못했습니다.</h2>
      <h1>404</h1>
      <p>주소가 잘못되었거나 더 이상 제공되지 않는 페이지입니다.</p>
      <a href="/">홈으로 돌아가기</a>
    </div>
  );
};

export default NotFound;
