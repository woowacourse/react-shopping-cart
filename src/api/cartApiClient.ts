import { generateBasicToken } from "../utils/generateBasicToken";
import axios from "axios";

const CART_API_URL = import.meta.env.VITE_CART_API_URL as string;
const USERNAME = import.meta.env.VITE_USERNAME as string;
const USER_PASSWORD = import.meta.env.VITE_PASSWORD as string;

if (!CART_API_URL || !USERNAME || !USER_PASSWORD) {
  throw new Error("CART_API_URL, USERNAME, PASSWORD environment variables are not set");
}

export const cartApiClient = axios.create({
  baseURL: CART_API_URL,
  headers: {
    Authorization: generateBasicToken(USERNAME, USER_PASSWORD),
  },
});
