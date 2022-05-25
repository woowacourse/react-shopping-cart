import * as API from "../api";
import { ADD_PRODUCT_IDS, REMOVE_PRODUCT_ID } from "./checkedIds";
import createReducer from "./createReducer";
import { REPLACE_PRODUCTS } from "./products";
import { setSnackBarTypeFail, setSnackBarTypeSuccess } from "./snackBar";

const GET_CART_PRODUCTS = "cart-products/GET_CART_PRODUCTS";
const GET_CART_PRODUCTS_SUCCESS = "cart-products/GET_CART_PRODUCTS_SUCCESS";
const GET_CART_PRODUCTS_ERROR = "cart-products/GET_CART_PRODUCTS_ERROR";

const REMOVE_SHOPPING_CART_PRODUCTS =
  "cart-products/REMOVE_SHOPPING_CART_PRODUCTS";

const REMOVE_SHOPPING_CART_PRODUCT =
  "cart-product/REMOVE_SHOPPING_CART_PRODUCT";

const INCREMENT_CART_PRODUCT_QUANTITY =
  "cart-product/INCREMENT_CART_PRODUCT_QUANTITY";
const DECREMENT_CART_PRODUCT_QUANTITY =
  "cart-product/DECREMENT_CART_PRODUCT_QUANTITY";
const UPDATE_CART_PRODUCT_QUANTITY_BY_USER_INPUT =
  "cart-product/UPDATE_CART_PRODUCT_QUANTITY_BY_USER_INPUT";

const POST_CART_PRODUCT = "cart-product/POST_CART_PRODUCT";

export const postCartProduct =
  (id, newShoppingCartProduct, successCallback, failCallback) =>
  async (dispatch, getState) => {
    try {
      const { products } = getState();
      const newProduct = newShoppingCartProduct.data
        ? newShoppingCartProduct.data
        : newShoppingCartProduct;

      newProduct.isInShoppingCart = true;

      await Promise.all([
        API.patchProductById(id, newProduct),
        API.postShoppingCartProduct(newProduct),
      ]);

      const replaceProducts = products.data.map((product) => {
        if (product.id === id) return newProduct;
        return product;
      });

      dispatch({
        type: POST_CART_PRODUCT,
        newShoppingCartProduct: newProduct,
      });
      dispatch({
        type: REPLACE_PRODUCTS,
        replaceProducts: replaceProducts,
      });
      dispatch(successCallback());
    } catch (error) {
      dispatch(failCallback());
    }
  };

export const removeCartProducts = () => async (dispatch, getState) => {
  try {
    const { shoppingCartProducts, checkedProductIds, products } = getState();
    const remainProducts = [...shoppingCartProducts.data];
    const newProducts = [...products.data];
    const removeProducts = [];

    checkedProductIds.forEach((id) => {
      remainProducts.forEach((product, index) => {
        if (id === product.id) {
          removeProducts.push(remainProducts.splice(index, 1)[0]);
        }
      });
    });

    const updateProducts = removeProducts.map((product) => {
      product.isInShoppingCart = false;
      return product;
    });

    Promise.all(
      checkedProductIds
        .map((id) => API.removeShoppingCartProduct(id))
        .concat(
          updateProducts.map((product) =>
            API.patchProductById(product.id, product)
          )
        )
    );

    const replaceProducts = newProducts.map((product) => {
      if (checkedProductIds.includes(product.id)) {
        product.isInShoppingCart = false;
        return product;
      }
      return product;
    });

    dispatch({ type: REPLACE_PRODUCTS, replaceProducts });
    dispatch({
      type: REMOVE_SHOPPING_CART_PRODUCTS,
      newShoppingCartProducts: remainProducts,
    });
  } catch (error) {
    dispatch({ type: GET_CART_PRODUCTS_ERROR });
  }
};

export const removeCartProduct = (id) => async (dispatch, getState) => {
  try {
    const { shoppingCartProducts, products } = getState();
    const newShoppingCartProducts = shoppingCartProducts.data.filter(
      (product) => product.id !== id
    );
    const removeProduct = shoppingCartProducts.data.filter(
      (product) => product.id === id
    )[0];
    removeProduct.isInShoppingCart = false;

    await Promise.all([
      API.removeShoppingCartProduct(id),
      API.patchProductById(id, removeProduct),
    ]);

    const replaceProducts = products.data.map((product) => {
      if (product.id === id) return removeProduct;
      return product;
    });

    dispatch({ type: REMOVE_SHOPPING_CART_PRODUCT, newShoppingCartProducts });
    dispatch({ type: REPLACE_PRODUCTS, replaceProducts });
    dispatch({ type: REMOVE_PRODUCT_ID, removeId: id });
  } catch (error) {
    dispatch({ type: GET_CART_PRODUCTS_ERROR });
  }
};

export const updateCartProductQuantity =
  (id, type, currentValue) => async (dispatch, getState) => {
    try {
      if (currentValue && Number(currentValue) < 1) return;

      const shoppingCartProducts = getState().shoppingCartProducts;
      const newProducts = [...shoppingCartProducts.data];
      const newTargetShoppingCartProduct = shoppingCartProducts.data.filter(
        (product) => product.id === id
      )[0];

      if (type === "increment") {
        newTargetShoppingCartProduct.quantity += 1;
      } else if (type === "decrement") {
        newTargetShoppingCartProduct.quantity > 1
          ? (newTargetShoppingCartProduct.quantity -= 1)
          : (newTargetShoppingCartProduct.quantity = 1);
      } else {
        newTargetShoppingCartProduct.quantity = Number(currentValue);
      }

      await API.patchShoppingCartProduct(id, newTargetShoppingCartProduct);

      dispatch({
        type: UPDATE_CART_PRODUCT_QUANTITY_BY_USER_INPUT,
        newShoppingCartProducts: newProducts,
      });
    } catch (error) {
      dispatch({ type: GET_CART_PRODUCTS_ERROR });
    }
  };

export const getShoppingCartProducts = () => async (dispatch) => {
  dispatch({ type: GET_CART_PRODUCTS });

  try {
    const shoppingCartProducts = await API.getShoppingCartProducts();
    const ids = shoppingCartProducts.data.map((product) => product.id);

    dispatch({
      type: GET_CART_PRODUCTS_SUCCESS,
      shoppingCartProducts: shoppingCartProducts.data,
    });
    dispatch({ type: ADD_PRODUCT_IDS, ids });
  } catch (error) {
    dispatch({ type: GET_CART_PRODUCTS_ERROR });
  }
};

const getCartProducts = () => ({
  loading: true,
  data: [],
  error: false,
});

const getCartProductsSuccess = (state, action) => ({
  loading: false,
  data: state.data.concat(action.shoppingCartProducts),
  error: false,
});

const getCartProductsError = () => ({
  loading: false,
  data: [],
  error: true,
});

const updateProductQuantity = (state, action) => ({
  ...state,
  data: action.newShoppingCartProducts,
});

const postProduct = (state, action) => ({
  ...state,
  data: state.data.concat(action.newShoppingCartProduct),
});

const shoppingCartProductsReducer = createReducer(
  {},
  {
    [GET_CART_PRODUCTS]: getCartProducts,
    [GET_CART_PRODUCTS_SUCCESS]: getCartProductsSuccess,
    [GET_CART_PRODUCTS_ERROR]: getCartProductsError,
    [INCREMENT_CART_PRODUCT_QUANTITY]: updateProductQuantity,
    [DECREMENT_CART_PRODUCT_QUANTITY]: updateProductQuantity,
    [UPDATE_CART_PRODUCT_QUANTITY_BY_USER_INPUT]: updateProductQuantity,
    [REMOVE_SHOPPING_CART_PRODUCT]: updateProductQuantity,
    [POST_CART_PRODUCT]: postProduct,
    [REMOVE_SHOPPING_CART_PRODUCTS]: updateProductQuantity,
  }
);

export default shoppingCartProductsReducer;
