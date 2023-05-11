import ProductItemList from '../../components/ProductItemList';
import styles from './index.module.scss';

const Home = () => {
  return (
    <main className={styles['main-container']}>
      <ProductItemList />
    </main>
  );
};

export default Home;
