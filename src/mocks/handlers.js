import { rest } from 'msw';
import { SERVER_URL, PATH } from 'constants';

export const handlers = [
  rest.get(`${SERVER_URL}${PATH.PRODUCTS}`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(dummyProducts)),
  ),

  rest.get(`${SERVER_URL}${PATH.CARTS}`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(dummyCarts)),
  ),

  rest.post(`${SERVER_URL}${PATH.CARTS}`, (req, res, ctx) => {
    const addedItem = req.body;

    dummyCarts = [...dummyCarts, addedItem];

    return res(ctx.status(200), ctx.json(addedItem));
  }),

  rest.delete(`${SERVER_URL}${PATH.CARTS}/:id`, (req, res, ctx) => {
    const { id } = req.params;

    dummyCarts = dummyCarts.filter((cart) => cart.id !== id);

    return res(ctx.status(200));
  }),

  rest.put(`${SERVER_URL}${PATH.CARTS}/:id`, (req, res, ctx) => {
    const updatedItem = req.body;

    dummyCarts = dummyCarts.map((cart) => {
      if (cart.id === updatedItem.id) {
        return updatedItem;
      }
      return cart;
    });

    return res(ctx.status(200));
  }),
];

const dummyProducts = [
  {
    id: '11',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001636]_20210225093600536.jpg',
    title: '콜드 브루 몰트',
    price: '4800',
  },
  {
    id: '22',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000487]_20210430112319040.jpg',
    title: '바닐라 크림 콜드 브루',
    price: '4200',
  },
  {
    id: '33',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[72]_20210415140949967.jpg',
    title: '시그니처 핫 초콜릿',
    price: '5500',
  },
  {
    id: '44',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000002672]_20220311105511600.jpg',
    title: '제주 비자림 콜드 브루',
    price: '6500',
  },
  {
    id: '55',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000003988]_20220406113215251.jpg',
    title: '롤린 민트 초코 콜드 브루',
    price: '2800',
  },
  {
    id: '66',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9300000002853]_20210419104333070.jpg',
    title: '기운내라임',
    price: '4800',
  },
  {
    id: '77',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000038]_20210430113202458.jpg',
    title: '콜드 브루',
    price: '1800',
  },
  {
    id: '88',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000004119]_20220412083025862.png',
    title: '라벤더 카페 브레베',
    price: '5800',
  },
  {
    id: '99',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001086]_20210225090838931.jpg',
    title: '럼 샷 코르타도',
    price: '5500',
  },
  {
    id: '100',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000002095]_20210225095033382.jpg',
    title: '사케라또 비안코 오버 아이스',
    price: '6800',
  },
  {
    id: '110',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/03/[9200000003505]_20210322093241535.jpg',
    title: '사케라또 아포가토',
    price: '4800',
  },
  {
    id: '120',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002406]_20210415135507733.jpg',
    title: '바닐라 플랫 화이트',
    price: '4800',
  },
];

let dummyCarts = [];
