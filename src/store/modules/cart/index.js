import { actionTypes } from './actionTypes';

const initialState = {
  products: [],
  checkedIds: [],
  count: 0,
  orderDetail: {},
  totalPrice: 0,
  totalOrders: 0,
};

const getState = (products) => {
  return {
    products,
    count: products.length,
    checkedIds: products.map((product) => product.id),
    orderDetail: products.reduce((target, product) => {
      target[product.id] = {
        id: product.id,
        quantity: 1,
        price: Number(product.price),
      };

      return target;
    }, {}),
    totalPrice: products.reduce((target, product) => {
      return target + Number(product.price);
    }, 0),
    totalOrders: products.length,
  };
};

const getCartResult = (checkedIds, orderDetail) => {
  return checkedIds.reduce(
    (payment, id) => {
      const { quantity, price } = orderDetail[id];
      return {
        totalPrice: payment.totalPrice + Number(price),
        totalOrders: payment.totalOrders + Number(quantity),
      };
    },
    {
      totalPrice: 0,
      totalOrders: 0,
    }
  );
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.SET_CART_PRODUCT_LIST: {
      const { products } = payload;
      return {
        ...state,
        ...getState(products),
      };
    }

    case actionTypes.ADD_PRODUCT_TO_CART: {
      const { product } = payload;

      const products = state.products.concat(product);

      return {
        ...state,
        ...getState(products),
      };
    }

    case actionTypes.REMOVE_PRODUCT_TO_CART: {
      const { id: targetId } = payload;
      const products = state.products.filter(({ id: _id }) => _id !== targetId);
      const checkedIds = state.checkedIds.filter((_id) => _id !== targetId);
      const orderDetail = products.reduce((target, product) => {
        const { id, price } = product;

        target[id] = {
          id: id,
          quantity: state.orderDetail[id].quantity || 1,
          price: state.orderDetail[id].price || Number(price),
        };

        return target;
      }, {});

      const { totalPrice, totalOrders } = getCartResult(checkedIds, orderDetail);

      return {
        ...state,
        products,
        checkedIds,
        count: state.count - 1,
        orderDetail,
        totalPrice,
        totalOrders,
      };
    }

    case actionTypes.CHECK: {
      const { id, price, quantity } = payload;
      return {
        ...state,
        checkedIds: [...state.checkedIds, id],
        totalPrice: state.totalPrice + Number(price),
        totalOrders: state.totalOrders + Number(quantity),
      };
    }

    case actionTypes.UN_CHECK: {
      const { id, price, quantity } = payload;
      return {
        ...state,
        checkedIds: state.checkedIds.filter((_id) => _id !== id),
        totalPrice: state.totalPrice - Number(price),
        totalOrders: state.totalOrders - Number(quantity),
      };
    }

    case actionTypes.ALL_CHECK: {
      const checkedIds = state.products.map((product) => product.id);
      const { totalPrice, totalOrders } = getCartResult(checkedIds, state.orderDetail);
      return {
        ...state,
        checkedIds,
        totalPrice,
        totalOrders,
      };
    }

    case actionTypes.ALL_UN_CHECK:
      return {
        ...state,
        checkedIds: [],
        totalPrice: 0,
        totalOrders: 0,
      };

    case actionTypes.ORDER_DETAIL: {
      const { id } = payload;
      const orderDetail = { ...state.orderDetail };
      orderDetail[`${id}`] = payload;
      const { totalPrice, totalOrders } = getCartResult(state.checkedIds, orderDetail);
      return {
        ...state,
        orderDetail,
        totalPrice,
        totalOrders,
      };
    }
    default:
      return state;
  }
}

export default reducer;
