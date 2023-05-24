import type { CartItem, Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: '초콜릿 블리츠 케이크',
    price: 38000,
    imageUrl: 'https://user-images.githubusercontent.com/87642422/237034529-5ca0aa1a-c835-48cc-95f9-03734fba1834.png',
  },
  {
    id: 2,
    name: '삼양 유어스 슈넬치킨 220g',
    price: 23800,
    imageUrl: 'https://user-images.githubusercontent.com/87642422/237034940-e821ce4f-ce20-4a37-9670-d6bec1983580.png',
  },
  {
    id: 3,
    name: '프렌치 데이드림 마카롱 세트',
    price: 26500,
    imageUrl: 'https://user-images.githubusercontent.com/87642422/237034950-08f7063a-ff29-4ded-b010-8aa2ca378de6.png',
  },
  {
    id: 4,
    name: '설로인 소고기',
    price: 26500,
    imageUrl: 'https://user-images.githubusercontent.com/87642422/237034964-aae42f44-a957-4083-b2ed-d1a65b91f7f7.png',
  },
  {
    id: 5,
    name: '프리미엄 초콜릿 조각 케이크',
    price: 9800,
    imageUrl: 'https://user-images.githubusercontent.com/87642422/237034991-962fecb7-42cb-499f-b9c4-32ef863031ee.png',
  },
  {
    id: 6,
    name: '면사랑 크림우동 1인분 5개',
    price: 29340,
    imageUrl: 'https://user-images.githubusercontent.com/87642422/237035012-4965f6d2-ad46-4ba2-bdaf-1010fbd99128.jpg',
  },
  {
    id: 7,
    name: '헤이즐넛 초콜릿 케이크',
    price: 34200,
    imageUrl: 'https://user-images.githubusercontent.com/87642422/237034529-5ca0aa1a-c835-48cc-95f9-03734fba1834.png',
  },
  {
    id: 8,
    name: '삼양 유어스 슈넬치킨 220g',
    price: 34100,
    imageUrl: 'https://user-images.githubusercontent.com/87642422/237034940-e821ce4f-ce20-4a37-9670-d6bec1983580.png',
  },
  {
    id: 9,
    name: '마카롱 8종 세트',
    price: 21000,
    imageUrl: 'https://user-images.githubusercontent.com/87642422/237034950-08f7063a-ff29-4ded-b010-8aa2ca378de6.png',
  },
  {
    id: 10,
    name: '횡성 한우 500g',
    price: 54800,
    imageUrl: 'https://user-images.githubusercontent.com/87642422/237034964-aae42f44-a957-4083-b2ed-d1a65b91f7f7.png',
  },
  {
    id: 11,
    name: '다크 초콜릿 조각 케이크',
    price: 11200,
    imageUrl: 'https://user-images.githubusercontent.com/87642422/237034991-962fecb7-42cb-499f-b9c4-32ef863031ee.png',
  },
  {
    id: 12,
    name: '면사랑 크림우동 1인분 10개',
    price: 44600,
    imageUrl: 'https://user-images.githubusercontent.com/87642422/237035012-4965f6d2-ad46-4ba2-bdaf-1010fbd99128.jpg',
  },
];

export const cartItems: CartItem[] = [];
