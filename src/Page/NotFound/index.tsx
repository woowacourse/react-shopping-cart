import styles from './index.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h2>Oops! Page not found.</h2>
      <h1>404</h1>
      <p>We can't find the page you're looking for.</p>
      <a href="/">Go back home</a>
    </div>
  );
};

export default NotFound;
