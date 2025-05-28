import { useReducer } from 'react';

type CheckState = Record<number, boolean>;

type Action = { type: 'TOGGLE'; id: number } | { type: 'CHECK_ALL' } | { type: 'UNCHECK_ALL' };

function reducer(state: CheckState, action: Action): CheckState {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, [action.id]: !state[action.id] };

    case 'CHECK_ALL':
      return Object.fromEntries(Object.keys(state).map((id) => [id, true]));

    case 'UNCHECK_ALL':
      return Object.fromEntries(Object.keys(state).map((id) => [id, false]));

    default:
      return state;
  }
}

export function useCheckList(initialIds: number[]) {
  const initialState: CheckState = Object.fromEntries(initialIds.map((id) => [id, true]));
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggle = (id: number) => dispatch({ type: 'TOGGLE', id });
  const checkAll = () => dispatch({ type: 'CHECK_ALL' });
  const uncheckAll = () => dispatch({ type: 'UNCHECK_ALL' });
  const isAllChecked = Object.values(state).every(Boolean);

  return {
    state,
    toggle,
    checkAll,
    uncheckAll,
    isAllChecked
  };
}
