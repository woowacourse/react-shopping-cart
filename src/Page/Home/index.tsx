import ToastList from '../../components/Common/Toast/ToastList';
import ProductItemList from '../../components/ProductItemList';
import styles from './index.module.scss';

function Home() {
  return (
    <>
      <main className={styles['main-container']}>
        <ProductItemList />
      </main>
      <ToastList />
    </>
  );
}

export default Home;
