import ProductItemList from '../../components/ProductItemList';
import styles from './index.module.scss';

function Home() {
  return (
    <main className={styles['main-container']}>
      <ProductItemList />
    </main>
  );
}

export default Home;
