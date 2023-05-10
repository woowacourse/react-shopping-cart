import { atom, useRecoilValue } from 'recoil';

import Header from '../components/Header/Header';
import ProductList from '../components/ProductList/ProductList';
import initialListData from '../data/mockData.json';
import { CartItemData, ProductItemData } from '../types';

export const cartAdditionState = atom<boolean>({
  key: 'cartAddition',
  default: false,
  effects: [
    ({ setSelf, onSet }) => {
      onSet(() => {
        setTimeout(() => {
          setSelf(false);
        }, 2500);
      });
    },
  ],
});

export const productListState = atom<ProductItemData[]>({
  key: 'productList',
  default: [],
  effects: [({ setSelf }) => setSelf(initialListData)],
});

export const cartListState = atom<CartItemData[]>({
  key: 'cartList',
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const storeKey = 'cartList';
      const savedValue = localStorage.getItem(storeKey);

      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      } else {
        localStorage.setItem(storeKey, '[]');
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(storeKey)
          : localStorage.setItem(storeKey, JSON.stringify(newValue));
      });
    },
  ],
});

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
