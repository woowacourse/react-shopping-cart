import axios from "axios";

import products from "./productsAPI";
import cart from "./cartAPI";
import orderList from "./orderListAPI";

axios.defaults.baseURL = "https://shopping-cart.techcourse.co.kr";

const api = {
  products,
  cart,
  orderList,
};

export default api;
