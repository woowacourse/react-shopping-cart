import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
