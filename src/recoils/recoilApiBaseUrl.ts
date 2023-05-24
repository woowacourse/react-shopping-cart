import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

export const ApiBaseUrlState = atom({
  key: 'apiUrlState',
  default: 'http://3.34.190.40:8080',
});

export const useApiBaseUrlValue = () => useRecoilValue(ApiBaseUrlState);

export const useSetApiBaseUrl = () => useSetRecoilState(ApiBaseUrlState);
