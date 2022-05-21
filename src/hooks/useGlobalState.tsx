import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import useAppDispatch from './useAppDispatch';

type Key = 'product' | 'cart';

const useGlobalState = (key: Key) => {
  const dispatch = useAppDispatch();
  const state = useSelector((state: RootState) => state[key]);

  return { dispatch, state };
};

export default useGlobalState;
