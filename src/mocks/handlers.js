import { API } from 'constants/api';
import { rest } from 'msw';
import { findByIdInObjectArray } from 'utils';

const products = [
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
    price: '4500',
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
    price: '5800',
  },
];
const users = {
  a1b2c3d4: {
    carts: [
      { id: '11', quantity: 1 },
      { id: '33', quantity: 3 },
      { id: '44', quantity: 5 },
    ],
  },
};

export const handlers = [
  rest.get(`/${API.PRODUCTS}`, (req, res, ctx) => {
    const { userid } = req.headers['_headers'];

    if (userid) {
      const storedProductsId = users[userid].carts.map((product) => product.id);
      const quantityContainedProducts = products.map((product) => {
        if (storedProductsId.includes(product.id)) {
          return {
            ...product,
            quantity: findByIdInObjectArray(users[userid].carts, product.id)
              .quantity,
            isStored: true,
          };
        }
        return product;
      });

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(quantityContainedProducts)
      );
    } else {
      return res(ctx.delay(1000), ctx.status(200), ctx.json(products));
    }
  }),

  rest.get(`/${API.CARTS}`, (req, res, ctx) => {
    const { userid } = req.headers['_headers'];

    if (userid) {
      return res(ctx.status(200), ctx.json(users[userid].carts));
    } else {
      return res(ctx.status(200), ctx.json([]));
    }
  }),

  rest.post(`/${API.CARTS}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const { userid } = req.headers['_headers'];

    users[userid].carts.push({ id, quantity: 1 });

    return res(ctx.delay(500), ctx.status(200));
  }),

  rest.delete(`/${API.CARTS}/:cartList`, (req, res, ctx) => {
    const { cartList } = req.params;
    const { userid } = req.headers['_headers'];

    const requestedCartList = cartList.split('&');

    users[userid].carts = users[userid].carts.filter(
      (cart) => !requestedCartList.includes(cart.id)
    );

    return res(ctx.delay(500), ctx.status(204));
  }),

  rest.get(`/${API.PRODUCT}/:id`, (req, res, ctx) => {
    const { id } = req.params;

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json(findByIdInObjectArray(products, id))
    );
  }),

  rest.patch(`/${API.CARTS}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const { userid } = req.headers['_headers'];

    const quantity = req.body;

    const targetCarts = users[userid].carts;
    findByIdInObjectArray(targetCarts, id).quantity = +quantity;

    return res(ctx.status(200), ctx.json(findByIdInObjectArray(products, id)));
  }),
];
