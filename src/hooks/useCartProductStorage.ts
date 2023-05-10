import type { CartProduct } from '../types/product';

type StoredCartProducts = CartProduct[];
type SetStoredCartProducts = (cartProducts: CartProduct[]) => void;
type UseCartProductStorage = [StoredCartProducts, SetStoredCartProducts];

const STORAGE_ID = 'shop-cart';

const useCartProductStorage = (): UseCartProductStorage => {
  const storedCartProducts: CartProduct[] = JSON.parse(
    localStorage.getItem(STORAGE_ID) ?? '[]'
  );

  const setStoredCartProducts = (cartProducts: CartProduct[]) => {
    localStorage.setItem(STORAGE_ID, JSON.stringify(cartProducts));
  };

  return [storedCartProducts, setStoredCartProducts];
};

export default useCartProductStorage;
