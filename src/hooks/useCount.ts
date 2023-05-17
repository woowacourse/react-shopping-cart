import { useReducer } from 'react';

import { CountAction, CountState } from '../type/counter';
import { ERROR } from '../constants/error';
import {
  ACTION_CHANGE,
  ACTION_DECREASE,
  ACTION_INCREASE,
} from '../constants/counter';

const unknownCountAction = (action: never): never => {
  throw new Error(ERROR.INVALID_ACTION);
};

const countDispatcher = (state: CountState, next: CountAction): CountState => {
  const { action, payload } = next;
  switch (action) {
    case ACTION_INCREASE:
      return { value: state.value + 1, status: 'VALID' };
    case ACTION_DECREASE:
      return { value: Math.max(state.value - 1, 1), status: 'VALID' };
    case ACTION_CHANGE:
      const newValue = payload.replaceAll(/\D+/g, '');
      const newStatus = newValue ? 'VALID' : 'INVALID';
      return { value: +newValue, status: newStatus };
    default:
      return unknownCountAction(action);
  }
};

export default function useCount() {
  const [count, setCount] = useReducer(countDispatcher, {
    value: 1,
    status: 'VALID',
  });

  return { count, setCount };
}
