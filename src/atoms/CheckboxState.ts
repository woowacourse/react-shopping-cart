import { atom } from 'recoil';

interface CheckboxesState {
  id: number;
  price: number;
  quantity: number;
}

const checkboxesInitState: CheckboxesState[] = [];

export const checkboxesState = atom({
  key: 'CheckboxesState',
  default: checkboxesInitState,
});
