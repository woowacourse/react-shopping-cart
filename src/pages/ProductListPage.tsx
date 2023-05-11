import { useRecoilValue } from 'recoil';

import Header from '../components/Header/Header';
import ProductList from '../components/ProductList/ProductList';
import { cartAdditionState } from '../store/cart';

const ProductListPage = () => {
  const cartAddition = useRecoilValue(cartAdditionState);

  return (
    <>
      <Header />

      <main>
        <ProductList />
      </main>
      {cartAddition ? <div className="added-message">장바구니에 상품을 추가했습니다.</div> : ''}
    </>
  );
};

export default ProductListPage;
