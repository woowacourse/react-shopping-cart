import {
  CART_LIST_KEY,
  PRODUCT_QUANTITY_LIST_KEY,
  getCartIdList,
  getProductQuantityList,
} from '../utils/localStorage';

export const useLocalStorage = () => {
  const addNewCartId = (id: number) => {
    const cartIdList = getCartIdList();
    const productQuantityList = getProductQuantityList();

    if (cartIdList.includes(id)) return;

    localStorage.setItem(CART_LIST_KEY, JSON.stringify([...cartIdList, id]));

    localStorage.setItem(
      PRODUCT_QUANTITY_LIST_KEY,
      JSON.stringify({ ...productQuantityList, [id]: 1 })
    );
  };

  const deleteCartId = (id: number) => {
    const cartIdList = getCartIdList();
    const productQuantityList = getProductQuantityList();

    localStorage.setItem(
      CART_LIST_KEY,
      JSON.stringify(cartIdList.filter((cartId) => cartId !== id))
    );

    delete productQuantityList[`${id}`];

    localStorage.setItem(
      PRODUCT_QUANTITY_LIST_KEY,
      JSON.stringify({ ...productQuantityList })
    );
  };

  const getProductQuantityById = (id: number) => {
    const productQuantityList = getProductQuantityList();
    const productQuantity = productQuantityList[`${id}`];

    if (productQuantity === undefined) return 0;

    return productQuantity;
  };

  const patchProductQuantity = (id: number, quantity: number) => {
    const productQuantityList = getProductQuantityList();

    localStorage.setItem(
      PRODUCT_QUANTITY_LIST_KEY,
      JSON.stringify({
        ...productQuantityList,
        [id]: quantity,
      })
    );
  };

  return {
    addNewCartId,
    deleteCartId,
    getProductQuantityById,
    patchProductQuantity,
  };
};
