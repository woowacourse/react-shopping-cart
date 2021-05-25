import { createAction } from 'redux-actions';
import { requestTable } from '../api/request';
import { CART_QUERY, FAIL_MESSAGE, PRODUCT_QUERY } from '../constant';
import {
  CartProductDetailType,
  CartProductType,
  ProductDetailObjectType,
  ProductDetailType,
  ProductType,
} from '../type';
import {
  ACTIVATE_LOADING_SPINNER,
  ADD_SHOPPING_CART_ITEMS,
  CHECK_PRODUCT,
  DEACTIVATE_LOADING_SPINNER,
  DECREASE_PAGE_INDEX,
  DECREASE_PRODUCT_AMOUNT,
  INCREASE_PAGE_INDEX,
  INCREASE_PRODUCT_AMOUNT,
  INIT_PAGE_INDEX,
  REMOVE_SHOPPING_CART_ITEMS,
  TOGGLE_LIKE_PRODUCT,
  UNCHECK_PRODUCT,
  UPDATE_PRODUCT_LIST,
} from './actionType';
import { AppDispatch, persistedStore } from './store';

const activateLoading = createAction(ACTIVATE_LOADING_SPINNER);
const deactivateLoading = createAction(DEACTIVATE_LOADING_SPINNER);

const increasePageIndex = createAction(INCREASE_PAGE_INDEX);
const decreasePageIndex = createAction(DECREASE_PAGE_INDEX);
const initPageIndex = createAction(INIT_PAGE_INDEX);

const increaseProductAmount = createAction(INCREASE_PRODUCT_AMOUNT);
const decreaseProductAmount = createAction(DECREASE_PRODUCT_AMOUNT);

const toggleLikeProduct = createAction(TOGGLE_LIKE_PRODUCT);

const checkProduct = createAction(CHECK_PRODUCT);
const unCheckProduct = createAction(UNCHECK_PRODUCT);

const addShoppingCartItem = createAction(ADD_SHOPPING_CART_ITEMS);
const addShoppingCartItemAsync =
  (product: ProductDetailType) => async (dispatch: AppDispatch) => {
    try {
      dispatch(activateLoading());
      const { product_id }: ProductType = product;
      const response = await requestTable.POST(CART_QUERY, { product_id });

      if (response.status !== 201) throw new Error(await response.text());

      const dbShoppingCartItemList: Array<CartProductType> =
        await requestTable.GET(CART_QUERY);

      const targetProduct = dbShoppingCartItemList.find(
        (dbShoppingCartItem) =>
          dbShoppingCartItem.product_id === product.product_id
      );

      if (!targetProduct) throw new Error(FAIL_MESSAGE.SYNC_WITH_SERVER);

      const newProduct: CartProductDetailType = {
        ...targetProduct,
        quantity: 1,
        checked: false,
      };

      dispatch(addShoppingCartItem(newProduct));
    } catch (error) {
      console.log(error);
      persistedStore.purge();
    } finally {
      dispatch(deactivateLoading());
    }
  };

const removeShoppingCartItem = createAction(REMOVE_SHOPPING_CART_ITEMS);
const removeShoppingCartItemAsync =
  (product: CartProductDetailType) => async (dispatch: AppDispatch) => {
    try {
      dispatch(activateLoading());

      const response = await requestTable.DELETE(
        `${CART_QUERY}${product.cart_id}`
      );

      if (!response.ok) throw new Error(await response.text());

      dispatch(removeShoppingCartItem(product));
    } catch (error) {
      console.log(error);
      persistedStore.purge();
    } finally {
      dispatch(deactivateLoading());
    }
  };

const updateProductList = createAction(UPDATE_PRODUCT_LIST);
const updateProductListAsync =
  (products: ProductDetailObjectType) => async (dispatch: AppDispatch) => {
    try {
      dispatch(activateLoading());

      const productList = await requestTable.GET(PRODUCT_QUERY);

      productList.map((product: ProductType) => {
        const newProduct: ProductDetailType = {
          ...product,
          liked: !!products[product.product_id]?.liked,
        };

        return dispatch(updateProductList(newProduct));
      });
    } catch (error) {
      console.log(error);
      persistedStore.purge();
    } finally {
      dispatch(deactivateLoading());
    }
  };

export {
  addShoppingCartItemAsync,
  removeShoppingCartItemAsync,
  activateLoading,
  deactivateLoading,
  increaseProductAmount,
  decreaseProductAmount,
  increasePageIndex,
  decreasePageIndex,
  initPageIndex,
  toggleLikeProduct,
  addShoppingCartItem,
  removeShoppingCartItem,
  checkProduct,
  unCheckProduct,
  updateProductList,
  updateProductListAsync,
};
