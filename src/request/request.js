import { httpClient } from './httpClient';

export const requestInsertItem = (path, data) => httpClient.post({ path, data });
export const requestDeleteItem = (path, id) => httpClient.delete({ path: `${path}/${id}` });
export const requestGetItemList = (path) => httpClient.get({ path });
