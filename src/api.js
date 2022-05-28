import axios from "axios";

export const getProducts = async () => {
  return axios.get("/products");
};

export const getProductsByPage = (page) => {
  return axios.get(`/products?_page=${page}&_limit=10`);
};

export const getProductById = (id) => {
  return axios.get(`/products/${id}`);
};

export const patchProductById = (id, newState) => {
  return axios.patch(`/products/${id}`, newState);
};

export const getShoppingCartProducts = () => {
  return axios.get("/shopping-cart");
};

export const patchShoppingCartProduct = (id, newState) => {
  return axios.patch(`/shopping-cart/${id}`, newState);
};

export const removeShoppingCartProduct = (id) => {
  return axios.delete(`/shopping-cart/${id}`);
};

export const postShoppingCartProduct = (newState) => {
  return axios.post(`/shopping-cart`, newState);
};
