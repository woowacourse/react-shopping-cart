import { useEffect, useState } from 'react';
import {
  Loadable,
  RecoilState,
  RecoilValueReadOnly,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from 'recoil';
import { ERROR_CODE } from '../../constants/errors';
import { CustomError } from '../../validation/errors';

type LoadableState<T> = Loadable<T>['state'];

const useRefreshableState = <T,>(loadable: Loadable<T>) => {
  const [value, setValue] = useState<T>(() => handleState(loadable.state));

  function handleState(
    state: LoadableState<T>,
    options?: { skip: LoadableState<T>[] }
  ): T {
    if (options?.skip.includes(state)) return value;

    switch (state) {
      case 'loading':
        throw loadable.toPromise();
      case 'hasError':
        throw loadable.contents;
      case 'hasValue':
        return loadable.contents;
      default:
        throw new CustomError({ code: ERROR_CODE.UNEXPECTED_ERROR });
    }
  }

  useEffect(() => {
    setValue(handleState(loadable.state, { skip: ['loading'] }));
  }, [loadable]);

  return [value, setValue] as const;
};

export const useRefreshableRecoilValue = <T,>(
  recoilState: RecoilState<T> | RecoilValueReadOnly<T>
) => {
  const loadable = useRecoilValueLoadable(recoilState);
  const [value] = useRefreshableState(loadable);

  return value;
};

export const useRefreshableRecoilState = <T,>(recoilState: RecoilState<T>) => {
  const [loadable, setLoadable] = useRecoilStateLoadable(recoilState);
  const [value] = useRefreshableState(loadable);

  return [value, setLoadable] as const;
};
