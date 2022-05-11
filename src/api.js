import axios from "axios";

const BASE_URL = "https://shopping-cart-server2.herokuapp.com";

axios.defaults.baseURL = BASE_URL;

export const getProducts = async () => {
  return axios.get("/products");
};

export const getProductsByPage = async (page) => {
  return axios.get(`/products?_page=${page}&_limit=10`);
};

export const getProductById = async (id) => {
  return axios.get(`/products/${id}`);
};
