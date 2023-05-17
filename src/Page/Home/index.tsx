import { useSetRecoilState } from 'recoil';
import ToastList from '../../components/Common/Toast/ToastList';
import ProductItemList from '../../components/ProductItemList';
import styles from './index.module.scss';
import { $CartIdList } from '../../recoil/atom';
import useGetQuery from '../../hooks/useGetQuery';
import { useEffect } from 'react';
import type { CartItem } from '../../types';

function Home() {
  const { data } = useGetQuery<CartItem[]>('/cart-items');
  const setCartIdList = useSetRecoilState($CartIdList);

  useEffect(() => {
    if (data) {
      setCartIdList(data.map(({ product }) => product.id));
    }
  }, [data, setCartIdList]);

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
