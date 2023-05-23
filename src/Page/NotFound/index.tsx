import styles from './index.module.scss';

function NotFound() {
  return (
    <div className={styles.container}>
      <h2>이 페이지는 여기는 없는 페이지입니다. 😭</h2>
      <h1>404</h1>
      <p>주소가 맞는지 다시 한번 확인해주세요!</p>
      <a href="/">홈으로 돌아가기</a>
    </div>
  );
}

export default NotFound;
