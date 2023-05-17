import { atom } from 'recoil';
import { CartInformation } from '@type/types';

export const cartAtom = atom<CartInformation[]>({ key: 'cart', default: [] });
