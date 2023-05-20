import { useRecoilState } from 'recoil';

import { cartProductAtom } from '../recoil/cartProductData';
import { checkedItemAtom } from '../recoil/checkedProductData';
import { deleteCartProduct } from '../apis/cartProducts';
import type { CartProduct } from '../types/product';
import { useEffect } from 'react';

const useCheckedProducts = () => {
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);
  const [checkedProducts, setCheckedProducts] = useRecoilState(checkedItemAtom);

  const removeCheckedProducts = () => {
    const selectedProducts = checkedProducts.map((product) => product.id);

    setCartProducts(
      cartProducts.filter((product) => !selectedProducts.includes(product.id))
    );
    setCheckedProducts(
      checkedProducts.filter(
        (product) => !selectedProducts.includes(product.id)
      )
    );

    selectedProducts.forEach((id) => {
      deleteCartProduct(id);
    });
  };

  const handleCheckBoxChange = (cartProduct: CartProduct) => {
    const updatedCheckedItems = checkedProducts.includes(cartProduct)
      ? checkedProducts.filter((item) => item !== cartProduct)
      : [...checkedProducts, cartProduct];

    setCheckedProducts(updatedCheckedItems);
  };

  const handleAllCheckedProducts = () => {
    if (cartProducts.length === checkedProducts.length) {
      setCheckedProducts([]);
      return;
    }
    setCheckedProducts(cartProducts);
  };

  const isCheckedProduct = (cartProduct: CartProduct) => {
    return checkedProducts.includes(cartProduct);
  };

  useEffect(() => {
    if (cartProducts.length > 0) {
      setCheckedProducts(cartProducts);
    }
  }, [cartProducts]);

  return {
    removeCheckedProducts,
    handleCheckBoxChange,
    handleAllCheckedProducts,
    isCheckedProduct,
  };
};

export default useCheckedProducts;
