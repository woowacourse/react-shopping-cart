import { useRecoilState } from 'recoil';
import { productsState, isCheckedState } from '@store/productStore';
import { CartItemType } from '../types';

const useRemoveCheckedProducts = () => {
  const [products, setProducts] = useRecoilState<CartItemType[]>(productsState);
  const [isCheckedMap, setIsCheckedMap] = useRecoilState<Record<number, boolean>>(isCheckedState);

  const removeCheckedProducts = () => {
    const filteredProducts = products.filter((product) => !isCheckedMap[product.id]);

    const newIsCheckedMap = Object.keys(isCheckedMap)
      .filter((key) => !isCheckedMap[Number(key)])
      .reduce((acc, key) => {
        acc[Number(key)] = isCheckedMap[Number(key)];
        return acc;
      }, {} as Record<number, boolean>);

    setProducts(filteredProducts);
    setIsCheckedMap(newIsCheckedMap);
  };

  return { removeCheckedProducts };
};

export default useRemoveCheckedProducts;
