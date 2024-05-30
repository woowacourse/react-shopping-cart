import { fetchData } from '../';
import { generateBasicToken } from '../../utils';

import { API_ROUTE, USER_ID, USER_PASSWORD } from '../constants/apiSetting';
import { ERROR_MESSAGE } from '../constants/errorMessage';

export async function submitOrder(cartItemIds: number[]): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  await fetchData({
    url: API_ROUTE.ORDER,
    method: 'POST',
    body: { cartItemIds },
    token,
    defaultErrorMessage: ERROR_MESSAGE.SUBMIT_ORDER_FAILED,
  });
}
