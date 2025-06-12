import { useCallback, useEffect, useReducer } from 'react';

type Action<K> =
  | { type: 'TOGGLE'; id: K }
  | { type: 'CHECK_ALL' }
  | { type: 'UNCHECK_ALL' }
  | { type: 'DELETE_CHECKED_ITEMS'; id: K };

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
    case 'DELETE_CHECKED_ITEMS':
      newState.delete(action.id);
      return newState;
    default:
      return state;
  }
}

const STORAGE_KEY = 'check-list';

export function useCheckList<T, K>(items: T[], getKey: (item: T) => K) {
  const loadInitialState = useCallback((): Map<K, boolean> => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const entries: Array<[K, boolean]> = JSON.parse(stored);
      return new Map(entries);
    }
    return new Map(items.map((item) => [getKey(item), true]));
  }, [items, getKey]);

  const [state, dispatch] = useReducer(reducer<K>, loadInitialState());

  const toggle = (id: K) => dispatch({ type: 'TOGGLE', id });
  const checkAll = () => dispatch({ type: 'CHECK_ALL' });
  const uncheckAll = () => dispatch({ type: 'UNCHECK_ALL' });
  const deleteCheckedItems = (id: K) => dispatch({ type: 'DELETE_CHECKED_ITEMS', id });

  const isAllChecked = Array.from(state.values()).every(Boolean);

  useEffect(() => {
    const serialized = JSON.stringify(Array.from(state.entries()));
    localStorage.setItem(STORAGE_KEY, serialized);
  }, [state]);

  return {
    state,
    toggle,
    checkAll,
    uncheckAll,
    isAllChecked,
    deleteCheckedItems
  };
}
