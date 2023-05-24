import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

import { RECOIL_KEY } from '../constants';

export const ApiBaseUrlState = atom({
  key: RECOIL_KEY.API_BASE_URL_STATE,
  default: 'http://3.34.190.40:8080',
});

export const useApiBaseUrlValue = () => useRecoilValue(ApiBaseUrlState);

export const useSetApiBaseUrl = () => useSetRecoilState(ApiBaseUrlState);
