import { BASE_URL } from '.';
import MESSAGE from '../constants/Message';
import { fetchWithoutPayload } from './fetch';

export const fetchGetCoupons = async (): Promise<[]> => {
  const response = await fetchWithoutPayload({
    url: `${BASE_URL}/coupons`,
    method: 'GET',
    errorMessage: MESSAGE.error.gettingCoupons,
  });

  const data = await response.json();
  return data.content;
};
