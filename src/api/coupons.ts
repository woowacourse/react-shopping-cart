import { BASE_URL, USER_ID, USER_PASSWORD } from '.';
import { generateBasicToken } from './util/auth';

export const fetchCoupons = async (): Promise<any[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${BASE_URL}/coupons`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('쿠폰 정보 불러오기를 실패했습니다.');
  }

  const data = await response.json();
  return data;
};
