import { BASE_URL, PRODUCT_PATH } from '../../../constants/urlConstants';
import { createApiRequests } from '../../../utils/createApiRequests';

export const getProductsFetched = createApiRequests(BASE_URL)(PRODUCT_PATH).GET;
