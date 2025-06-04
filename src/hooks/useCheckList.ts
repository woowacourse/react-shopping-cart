import { useReducer } from 'react';

type Action<K> = { type: 'TOGGLE'; id: K } | { type: 'CHECK_ALL' } | { type: 'UNCHECK_ALL' };

function reducer<K>(state: Map<K, boolean>, action: Action<K>): Map<K, boolean> {
  const newState = new Map(state);

  switch (action.type) {
    case 'TOGGLE':
      newState.set(action.id, !state.get(action.id));
      return newState;
    case 'CHECK_ALL':
      for (const key of state.keys()) newState.set(key, true);
      return newState;
    case 'UNCHECK_ALL':
      for (const key of state.keys()) newState.set(key, false);
      return newState;
    default:
      return state;
  }
}

export function useCheckList<T, K>(items: T[], getKey: (item: T) => K) {
  const initialState = new Map<K, boolean>(items.map((item) => [getKey(item), true]));

  const [state, dispatch] = useReducer(reducer<K>, initialState);

  const toggle = (id: K) => dispatch({ type: 'TOGGLE', id });
  const checkAll = () => dispatch({ type: 'CHECK_ALL' });
  const uncheckAll = () => dispatch({ type: 'UNCHECK_ALL' });

  const isAllChecked = Array.from(state.values()).every(Boolean);

  return {
    state,
    toggle,
    checkAll,
    uncheckAll,
    isAllChecked
  };
}
