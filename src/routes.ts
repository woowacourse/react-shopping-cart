const HOME = "/";
const CART = "/cart";
const ORDER_LIST = "/order-list";

const routes = {
  home: HOME,
  cart: CART,
  orderList: ORDER_LIST,
  productDetail: (id?: number) => {
    return `/product/${id ?? ":id"}`;
  },
};

export default routes;
