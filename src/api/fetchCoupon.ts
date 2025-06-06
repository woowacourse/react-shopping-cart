import Coupon from "../types/Coupon";
import { HttpMethod } from "../types/HttpMethod";

type fetchCouponsParams = {
  method: HttpMethod;
};

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/coupons`;
const TOKEN = import.meta.env.VITE_TOKEN;

const fetchCoupons = async ({
  method,
}: fetchCouponsParams): Promise<{ content: Coupon[] }> => {
  const url = new URL(BASE_URL);

  const options = {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("에러 발생!");
  }

  const data = await response.json();

  return data;
};

export default fetchCoupons;
