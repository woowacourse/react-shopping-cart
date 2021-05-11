import { RETURN_TYPE } from '../../constants/api';
import { httpClient } from '../../request/httpClient';

export const requestInsertItem = (path, item) => httpClient.post({ path, body: item });
export const requestDeleteItem = (path, id) => httpClient.delete({ path: `${path}/${id}` });
export const requestGetItemList = (path) => httpClient.get({ path, returnType: RETURN_TYPE.JSON });
