import { createContext, useState, PropsWithChildren } from 'react';

export interface CachedData<T> {
  value: T;
  fetchedAt: number;
}

export interface ApiContextType {
  data: { [key: string]: CachedData<unknown> };
  setDataState: (
    updater: (prev: { [key: string]: CachedData<unknown> }) => { [key: string]: CachedData<unknown> }
  ) => void;
}

export const ApiContext = createContext<ApiContextType>({
  data: {},
  setDataState: () => {}
});

export function ApiProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<{ [key: string]: CachedData<unknown> }>({});

  const setDataState: ApiContextType['setDataState'] = (updater) => {
    setData((prev) => updater(prev));
  };

  return <ApiContext.Provider value={{ data, setDataState }}>{children}</ApiContext.Provider>;
}
