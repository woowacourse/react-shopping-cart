import { httpClient } from "../httpClient";

const ERROR_MESSAGE = "쿠폰 정보를 가져오는 데 실패했습니다.";

export const getCoupons = async (): any => {
  try {
    const data = await httpClient.get(`/coupons`);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(ERROR_MESSAGE);
  }
};
