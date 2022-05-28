import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Key = 'product' | 'cart';

const useGlobalState = (key: Key) => {
  return useSelector((state: RootState) => state[key]);
};

export default useGlobalState;
