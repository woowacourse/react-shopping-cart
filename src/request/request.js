import { RETURN_TYPE } from '../constants/api';
import { httpClient } from './httpClient';

export const requestInsertItem = (path, data) => httpClient.post({ path, body: data });
export const requestDeleteItem = (path, id) => httpClient.delete({ path: `${path}/${id}` });
export const requestGetItemList = (path) => httpClient.get({ path, returnType: RETURN_TYPE.JSON });
