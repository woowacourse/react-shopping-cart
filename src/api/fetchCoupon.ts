import { HttpMethod } from "../types/HttpMethod";

import { Coupon } from "../types/Coupon";

type fetchCouponsParams = {
  method: HttpMethod;
};

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/coupons`;
const TOKEN = import.meta.env.VITE_TOKEN;

const fetchCoupons = async ({
  method,
}: fetchCouponsParams): Promise<Coupon[]> => {
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
    throw new Error("쿠폰 정보를 가져오는데 실패했습니다.");
  }

  const data = await response.json();

  return data;
};

export default fetchCoupons;
