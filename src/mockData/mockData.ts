import { CartItemData, ProductData } from '../type';

interface MockProductsResponse {
  status: number;
  data: ProductData[];
}

interface MockCartResponse {
  status: number;
  data: CartItemData[];
}

export const mockCartResponse: MockCartResponse = {
  status: 200,
  data: [
    {
      cart_id: 1,
      image_url:
        'https://user-images.githubusercontent.com/42544600/118082383-0e69ad00-b3f8-11eb-8edb-d1d8de8e0b79.jpg',
      name: '파노의 강아지',
      price: 1000000000,
    },
  ],
};

export const mockProductsResponse: MockProductsResponse = {
  status: 200,
  data: [
    {
      product_id: 2,
      name: '치킨',
      price: 10000,
      image_url: 'http://example.com/chicken.jpg',
    },
    {
      product_id: 4,
      name: '파노의 강아지',
      price: 1000000000,
      image_url:
        'https://user-images.githubusercontent.com/42544600/118082383-0e69ad00-b3f8-11eb-8edb-d1d8de8e0b79.jpg',
    },
    {
      product_id: 5,
      name: '하루',
      price: 500000,
      image_url:
        'https://user-images.githubusercontent.com/42544600/118082370-090c6280-b3f8-11eb-882f-c0fd78a09e82.jpg',
    },
    {
      product_id: 6,
      name: '브랜',
      price: 100,
      image_url: 'https://zereight.github.io/react-payments/static/media/pullup.befeeb55.gif',
    },
    {
      product_id: 7,
      name: '포코 텅',
      price: 100000,
      image_url:
        'https://user-images.githubusercontent.com/42544600/118085440-5f2fd480-b3fd-11eb-992a-c66ddf9395c2.png',
    },
    {
      product_id: 8,
      name: '냥냥',
      price: 8400,
      image_url: 'https://cdn-mart.baemin.com/goods/custom/20200525/11323-main-01.png',
    },
    {
      product_id: 9,
      name: '노란 피쉬볼',
      price: 4300,
      image_url: 'https://cdn-mart.baemin.com/sellergoods/bulk/20201221-171323/17211-main-01.jpg',
    },
    {
      product_id: 10,
      name: '하얀 피쉬볼',
      price: 4300,
      image_url: 'https://cdn-mart.baemin.com/sellergoods/bulk/20201221-171323/17210-main-01.jpg',
    },
    {
      product_id: 11,
      name: '잡채 해물완자',
      price: 6900,
      image_url: 'https://cdn-mart.baemin.com/sellergoods/main/078766cf-593c-4ac5-abbf-fe1aadd981c1.jpg',
    },
    {
      product_id: 12,
      name: '부산 사각어묵',
      price: 8300,
      image_url: 'https://cdn-mart.baemin.com/sellergoods/main/00a503eb-eebc-45d8-9032-808dc0666289.jpg',
    },
    {
      product_id: 13,
      name: '치즈',
      price: 2900,
      image_url: 'https://cdn-mart.baemin.com/goods/custom/20200525/11161-main-01.png',
    },
    {
      product_id: 14,
      name: '무야호',
      price: 99000,
      image_url: 'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg',
    },
  ],
};
