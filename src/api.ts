import axios from "axios";
import { LOAD_ITEM_AMOUNT } from "./constants";
import { ProductType } from "./types/product";

const BASE_URL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = BASE_URL;

export const getProducts = () => {
  return axios.get<ProductType[]>("/products");
};

export const getProductsByPage = (page: number) => {
  return axios.get<ProductType[]>(
    `/products?_page=${page}&_limit=${LOAD_ITEM_AMOUNT}`
  );
};

export const getProductById = (id: number) => {
  return axios.get<ProductType>(`/products/${id}`);
};
