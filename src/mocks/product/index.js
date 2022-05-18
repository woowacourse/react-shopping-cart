import { rest } from 'msw';

export const products = [
  {
    product_id: 1,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/52afbaa7-809e-4e55-8080-3c357a94ba3a.gif',
    product_title: '배달이친구들 케이블타이',
    product_price: 4000,
  },
  {
    product_id: 2,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/f65ec0ec-ea5f-41bb-ba43-68579fbcf34a.png',
    product_title: '을지로 목장갑. 위잉 뚝딱',
    product_price: 6000,
  },
  {
    product_id: 3,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/526c13d0-5e85-438e-ae0b-ad91ac026eb9.gif',
    product_title: '배달이 친구들 팝업카드',
    product_price: 4000,
  },
  {
    product_id: 4,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/835c5ad8-22b6-4556-b3bd-a4e843c1190b.png',
    product_title: '유해물질이 나오지 않는 지우개',
    product_price: 1000,
  },
  {
    product_id: 5,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/a7e6cb1b-0929-46db-8434-208c65a6cbc5.png',
    product_title: '떡볶이키트. 떡볶이가 필요해',
    product_price: 11000,
  },
  {
    product_id: 6,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/b77cdcf9-3410-4122-9e5e-435a9724bff7.png',
    product_title: '포스터. 독고배달이',
    product_price: 2000,
  },
  {
    product_id: 7,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/401a94ad-fe25-4176-951b-2ea7cf4f989e.png',
    product_title: '배달이친구들 지금뭐해 피규어. 메이의 감미로운 오후',
    product_price: 3500,
  },
  {
    product_id: 8,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/0d5029a4-f153-4b13-9b46-ab16792a573e.png',
    product_title: '배달이친구들 지금뭐해 피규어. 독고의 책읽는 시간',
    product_price: 3500,
  },
  {
    product_id: 9,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/4c9e2976-e2c1-453a-bd3c-6f96a132ee7b.png',
    product_title: '배달이친구들 지금뭐해 피규어. 냥이의 등 긁는 하루',
    product_price: 3500,
  },
  {
    product_id: 10,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/21cb8a0e-3aa4-464e-9354-104030c54294.png',
    product_title: '배달이친구들 지금뭐해 피규어. 감자의 수확하는 계절',
    product_price: 3500,
  },
  {
    product_id: 11,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/52e07957-c5ab-4f0c-862b-9dc6318dfffa.png',
    product_title: '엽서. 복',
    product_price: 1000,
  },
  {
    product_id: 12,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/3a9fd048-ffc5-49ac-8a77-5428429ea635.png',
    product_title: '엽서. 축',
    product_price: 1000,
  },
];

export const productHandler = [
  rest.get('/mocking/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(products));
  }),
  rest.get('/mocking/products/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(req));
  }),
];
