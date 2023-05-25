import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { RECOIL_KEY } from '../constants';

export const ApiBaseUrlState = atom({
  key: RECOIL_KEY.API_BASE_URL_STATE,
  default: process.env.REACT_APP_API_DEFAULT,
});

export const ApiUrlSelector = selector({
  key: 'apiUrlSelector',
  get: ({ get }) => {
    const urlState = get(ApiBaseUrlState);
    if (urlState === '이리내') return process.env.REACT_APP_API_IRINAE;

    if (urlState === '채채') return process.env.REACT_APP_API_CHACHA;
  },
});

export const useApiBaseUrlState = () => useRecoilState(ApiBaseUrlState);

export const useApiBaseUrlValue = () => useRecoilValue(ApiUrlSelector);
