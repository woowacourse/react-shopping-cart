import axios from "axios";
import { LOAD_ITEM_AMOUNT } from "./constants";

const BASE_URL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = BASE_URL;

export const getProducts = async () => {
  return axios.get("/products");
};

export const getProductsByPage = async (page: number) => {
  return axios.get(`/products?_page=${page}&_limit=${LOAD_ITEM_AMOUNT}`);
};

export const getProductById = async (id: number) => {
  return axios.get(`/products/${id}`);
};
