import { ProductInformation } from 'types/types';
import {
  A_MOCK,
  B_MOCK,
  C_MOCK,
  D_MOCK,
  E_MOCK,
  F_MOCK,
  G_MOCK,
  H_MOCK,
  I_MOCK,
  J_MOCK,
  K_MOCK,
  L_MOCK,
} from '@assets/images';

interface ProductListProps {
  productList: ProductInformation[];
}

export const PRODUCT_LIST: ProductListProps = {
  productList: [
    {
      id: 1,
      name: 'PET보틀-정사각(420ml)',
      price: 43400,
      imageUrl: A_MOCK,
    },
    {
      id: 2,
      name: 'PET보틀-밀크티(370ml)',
      price: 73400,
      imageUrl: B_MOCK,
    },
    {
      id: 3,
      name: 'PET보틀-정사각(370ml)',
      price: 24400,
      imageUrl: C_MOCK,
    },
    {
      id: 4,
      name: 'PET보틀-밀크티(999ml)',
      price: 250000,
      imageUrl: D_MOCK,
    },
    {
      id: 5,
      name: 'PET보틀-밀크티(210ml)',
      price: 43000,
      imageUrl: E_MOCK,
    },
    {
      id: 6,
      name: 'PET보틀-밀크티(830ml)',
      price: 165000,
      imageUrl: F_MOCK,
    },
    {
      id: 7,
      name: 'PET보틀-밀크티(3L)',
      price: 1500000,
      imageUrl: G_MOCK,
    },
    {
      id: 8,
      name: 'PET보틀-콜라(120ml)',
      price: 1600,
      imageUrl: H_MOCK,
    },
    {
      id: 9,
      name: 'PET보틀-밀크티(540ml)',
      price: 5400,
      imageUrl: I_MOCK,
    },
    {
      id: 10,
      name: 'PET보틀-밀크티(950ml)',
      price: 123400,
      imageUrl: J_MOCK,
    },
    {
      id: 11,
      name: 'PET보틀-밀크티(360ml)',
      price: 13600,
      imageUrl: K_MOCK,
    },
    {
      id: 12,
      name: '우유-마감임박(50ml)',
      price: 400,
      imageUrl: L_MOCK,
    },
  ],
};
