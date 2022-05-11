import axios from "axios";

const BASE_URL = "https://shopping-cart-server2.herokuapp.com";

axios.defaults.baseURL = BASE_URL;

export const getProducts = async () => {
  return axios.get("/products");
};
