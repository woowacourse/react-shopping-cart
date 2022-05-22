import * as API from "../api";
import { ADD_PRODUCT_IDS, REMOVE_PRODUCT_ID } from "./checkedIds";
import createReducer from "./createReducer";
import { REPLACE_PRODUCTS } from "./products";
import { setSnackBarTypeFail, setSnackBarTypeSuccess } from "./snackBar";

const GET_CART_PRODUCTS = "cart-products/GET_CART_PRODUCTS";
const GET_CART_PRODUCTS_SUCCESS = "cart-products/GET_CART_PRODUCTS_SUCCESS";
const GET_CART_PRODUCTS_ERROR = "cart-products/GET_CART_PRODUCTS_ERROR";

const INCREMENT_CART_PRODUCT_QUANTITY =
  "cart-product/INCREMENT_CART_PRODUCT_QUANTITY";
const DECREMENT_CART_PRODUCT_QUANTITY =
  "cart-product/DECREMENT_CART_PRODUCT_QUANTITY";
const UPDATE_CART_PRODUCT_QUANTITY_BY_USER_INPUT =
  "cart-product/UPDATE_CART_PRODUCT_QUANTITY_BY_USER_INPUT";
const REMOVE_SHOPPING_CART_PRODUCT =
  "cart-product/REMOVE_SHOPPING_CART_PRODUCT";
const POST_CART_PRODUCT = "cart-product/POST_CART_PRODUCT";
const REMOVE_SHOPPING_CART_PRODUCTS =
  "cart-product/REMOVE_SHOPPING_CART_PRODUCTS";

export const postCartProduct =
  (id, newShoppingCartProduct) => async (dispatch, getState) => {
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
      dispatch(setSnackBarTypeSuccess());
    } catch (error) {
      dispatch(setSnackBarTypeFail());
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
          const removeProduct = remainProducts.splice(index, 1);

          removeProducts.push(removeProduct[0]);
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
    dispatch({ type: REMOVE_SHOPPING_CART_PRODUCTS, remainProducts });
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

    API.removeShoppingCartProduct(id);
    const newProduct = await API.patchProductById(id, removeProduct);

    const replaceProducts = products.data.map((product) => {
      if (product.id === id) return newProduct.data;
      return product;
    });

    dispatch({ type: REMOVE_SHOPPING_CART_PRODUCT, newShoppingCartProducts });
    dispatch({ type: REPLACE_PRODUCTS, replaceProducts });
    dispatch({ type: REMOVE_PRODUCT_ID, removeId: id });
  } catch (error) {
    dispatch({ type: GET_CART_PRODUCTS_ERROR });
  }
};

export const updateCartProductQuantityByUserInput =
  (id, currentValue) => async (dispatch, getState) => {
    try {
      if (Number(currentValue) < 1) return;

      const shoppingCartProducts = getState().shoppingCartProducts;
      const newProducts = [...shoppingCartProducts.data];
      const newTargetShoppingCartProduct = shoppingCartProducts.data.filter(
        (product) => product.id === id
      )[0];

      newTargetShoppingCartProduct.quantity = Number(currentValue);

      await API.patchShoppingCartProduct(id, newTargetShoppingCartProduct);

      dispatch({
        type: UPDATE_CART_PRODUCT_QUANTITY_BY_USER_INPUT,
        newShoppingCartProducts: newProducts,
      });
    } catch (error) {
      dispatch({ type: GET_CART_PRODUCTS_ERROR });
    }
  };

export const incrementCartProductQuantity =
  (id) => async (dispatch, getState) => {
    try {
      const shoppingCartProducts = getState().shoppingCartProducts;
      const newProducts = [...shoppingCartProducts.data];
      const newTargetShoppingCartProduct = shoppingCartProducts.data.filter(
        (product) => product.id === id
      )[0];

      newTargetShoppingCartProduct.quantity += 1;

      await API.patchShoppingCartProduct(id, newTargetShoppingCartProduct);

      dispatch({
        type: INCREMENT_CART_PRODUCT_QUANTITY,
        newShoppingCartProducts: newProducts,
      });
    } catch (error) {
      dispatch({ type: GET_CART_PRODUCTS_ERROR });
    }
  };

export const decrementCartProductQuantity =
  (id) => async (dispatch, getState) => {
    try {
      const shoppingCartProducts = getState().shoppingCartProducts;
      const newProducts = [...shoppingCartProducts.data];
      const newTargetShoppingCartProduct = shoppingCartProducts.data.filter(
        (product) => product.id === id
      )[0];

      newTargetShoppingCartProduct.quantity > 1
        ? (newTargetShoppingCartProduct.quantity -= 1)
        : (newTargetShoppingCartProduct.quantity = 1);

      await API.patchShoppingCartProduct(id, newTargetShoppingCartProduct);

      dispatch({
        type: DECREMENT_CART_PRODUCT_QUANTITY,
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

const getCartProductsSuccess = (shoppingCartProducts, action) => ({
  loading: false,
  data: shoppingCartProducts.data.concat(action.shoppingCartProducts),
  error: false,
});

const getCartProductsError = () => ({
  loading: false,
  data: [],
  error: true,
});

const incrementProductQuantity = (state, action) => {
  return {
    ...state,
    data: action.newShoppingCartProducts,
  };
};

const decrementProductQuantity = (state, action) => {
  return {
    ...state,
    data: action.newShoppingCartProducts,
  };
};

const updateProductQuantityByUserInput = (state, action) => {
  return {
    ...state,
    data: action.newShoppingCartProducts,
  };
};

const removeShoppingCartProduct = (state, action) => ({
  ...state,
  data: action.newShoppingCartProducts,
});

const removeShoppingCartProducts = (state, action) => ({
  ...state,
  data: action.remainProducts,
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
    [INCREMENT_CART_PRODUCT_QUANTITY]: incrementProductQuantity,
    [DECREMENT_CART_PRODUCT_QUANTITY]: decrementProductQuantity,
    [UPDATE_CART_PRODUCT_QUANTITY_BY_USER_INPUT]:
      updateProductQuantityByUserInput,
    [REMOVE_SHOPPING_CART_PRODUCT]: removeShoppingCartProduct,
    [POST_CART_PRODUCT]: postProduct,
    [REMOVE_SHOPPING_CART_PRODUCTS]: removeShoppingCartProducts,
  }
);

export default shoppingCartProductsReducer;
