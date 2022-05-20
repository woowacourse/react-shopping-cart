import {rest} from 'msw';
import {MOCK_PRODUCT_LIST, MOCK_PRODUCT_DETAIL} from './mockData';

export const handlers = [
  // 상품 목록 페이지: 상품 리스트 호출할 때
  rest.get(process.env.REACT_APP_PRODUCT_API_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_PRODUCT_LIST));
  }),

  // 상품 상세 페이지: 선택된 상품 정보를 호출할 때
  rest.get(`${process.env.REACT_APP_PRODUCT_API_URL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_PRODUCT_DETAIL));
  }),
];
