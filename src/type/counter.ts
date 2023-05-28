export type CounterDispatchAction = 'INCREASE' | 'DECREASE' | 'CHANGE';

export interface CountAction {
  action: CounterDispatchAction;
  payload: string;
}

export interface CountState {
  value: number;
  status: 'VALID' | 'INVALID';
}
