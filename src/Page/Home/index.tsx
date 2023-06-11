import ProductItemList from '../../components/ProductItemList';
import styles from './index.module.css';

const Home = () => {
  return (
    <main className={styles['main-container']}>
      <ProductItemList />
    </main>
  );
};

export default Home;
