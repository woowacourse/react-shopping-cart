import * as actions from 'reducers/cart/cart.actions';
import apiClient from 'utils/apiClient';

export const addCartAsync = (id) => async (dispatch) => {
  dispatch(actions.addCart());

  try {
    await apiClient.post('/cart', { id, quantity: 1 });
    // const data = { id, quantity: 1 };

    const { data } = await apiClient.get('/cart');
    console.log('datatata', data);
    dispatch(actions.addCartSuccess(data));
  } catch (error) {
    dispatch(actions.addCartError());
  }
};

// import * as actions from 'reducers/products/products.actions';
// import apiClient from 'utils/apiClient';

// export const getProductsAsync = async (dispatch) => {
//   dispatch(actions.getProducts());

//   try {
//     const { data } = await apiClient.get('products');
//     dispatch(actions.getProductsSuccess(data));
//   } catch (error) {
//     dispatch(actions.getProductsError());
//   }
// };
