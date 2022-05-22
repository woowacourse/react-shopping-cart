import { useState, useEffect } from 'react';

function useSelectShoppingBasketItem(shoppingBasketList) {
  const [selectedProductList, setSelectedProductList] = useState(
    shoppingBasketList.map(product => product.id)
  );

  useEffect(() => {
    const updatedSelectedProductList = selectedProductList.filter(
      selectedProductId =>
        shoppingBasketList.find(productInfo => productInfo.id === selectedProductId) !== undefined
    );

    setSelectedProductList(updatedSelectedProductList);
  }, [shoppingBasketList]);

  const isAllSelected =
    selectedProductList.length !== 0 && selectedProductList.length === shoppingBasketList.length;

  const estimatedPaymentAmount = shoppingBasketList.reduce((accumulatedPaymentAmount, product) => {
    const foundIndex = selectedProductList.findIndex(
      selectedProductId => selectedProductId === product.id
    );

    if (foundIndex === -1) {
      return accumulatedPaymentAmount;
    }

    return accumulatedPaymentAmount + product.price * product.quantity;
  }, 0);

  const clickCheckbox = (id, isSelected) => {
    isSelected ? selectProduct(id) : deselectProduct(id);
  };

  const selectProduct = id => {
    const updatedSelectedProductList = selectedProductList.concat(id);

    setSelectedProductList(updatedSelectedProductList);
  };

  const deselectProduct = id => {
    const updatedSelectedProductList = selectedProductList.filter(productId => productId !== id);

    setSelectedProductList(updatedSelectedProductList);
  };

  const clickAllCheckbox = checked => {
    checked ? selectAllProduct() : deselectAllProduct();
  };

  const selectAllProduct = () => {
    setSelectedProductList(shoppingBasketList.map(product => product.id));
  };

  const deselectAllProduct = () => {
    setSelectedProductList([]);
  };

  return {
    selectedProductList,
    isAllSelected,
    estimatedPaymentAmount,
    clickCheckbox,
    clickAllCheckbox,
  };
}

export default useSelectShoppingBasketItem;
