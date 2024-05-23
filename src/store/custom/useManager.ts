import {
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  RecoilValueReadOnly,
  RecoilState,
} from 'recoil';

const createUseSelectors = (selectors: {
  [key: string]: RecoilValueReadOnly<any> | ((id: any) => RecoilValueReadOnly<any>);
}) => {
  const result: { [key: string]: any } = {};
  for (const key in selectors) {
    if (typeof selectors[key] === 'function') {
      result[key] = (id: number) =>
        useRecoilValue((selectors[key] as (id: number) => RecoilValueReadOnly<any>)(id));
    } else {
      result[key] = useRecoilValue(selectors[key] as RecoilValueReadOnly<any>);
    }
  }
  return result;
};

const createUseActions = (actions: {
  [key: string]: RecoilState<any> | ((id: any) => RecoilState<any>);
}) => {
  const result: { [key: string]: any } = {};
  for (const key in actions) {
    if (typeof actions[key] === 'function') {
      result[key] = (id: number) =>
        useSetRecoilState((actions[key] as (id: number) => RecoilState<any>)(id));
    } else {
      result[key] = useSetRecoilState(actions[key] as RecoilState<any>);
    }
  }
  return result;
};

const createUseRecoilStates = (states: {
  [key: string]: RecoilState<any> | ((id: any) => RecoilState<any>);
}) => {
  const result: { [key: string]: any } = {};
  for (const key in states) {
    if (typeof states[key] === 'function') {
      result[key] = (id: any) => useRecoilState((states[key] as (id: any) => RecoilState<any>)(id));
    } else {
      result[key] = useRecoilState(states[key] as RecoilState<any>);
    }
  }
  return result;
};

export const useManager = (
  selectors: { [key: string]: RecoilValueReadOnly<any> | ((id: any) => RecoilValueReadOnly<any>) },
  actions: { [key: string]: RecoilState<any> | ((id: any) => RecoilState<any>) },
  states?: { [key: string]: RecoilState<any> | ((id: any) => RecoilState<any>) },
) => {
  return {
    ...createUseSelectors(selectors),
    ...createUseActions(actions),
    ...createUseRecoilStates(states || {}),
  };
};
