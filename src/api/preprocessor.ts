import { ApiData } from '../types/Product';

export const preprocessor = (dataList: ApiData[]) => {
  return dataList.map(data => ({ ...data, id: data.id.toString() }));
};
