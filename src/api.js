import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

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

export const getShoppingCartProducts = async () => {
  return axios.get("/shopping-cart");
};

export const patchShoppingCartProduct = async (id, newState) => {
  return axios.patch(`/shopping-cart/${id}`, newState);
};

export const removeShoppingCartProduct = async (id) => {
  return axios.delete(`/shopping-cart/${id}`);
};
