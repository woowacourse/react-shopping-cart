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
      name: '더asdasdasdasdasdㅇㅁㄴㅇㅁㄴㄹㅈㄷㄹwefwafasasdasdasd마독 관절 강아지 사료 2kg 가수분해 슬개골 as 개사료',
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
      price: 28497140112412412123124128964827154879123512893745129845621398457315763120875613708561237856132875612387561238576123587123658173265132865102856321087561238945623109856243908463219486123571236578326548723640782316408732564230875672081356241243212312324400,
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
