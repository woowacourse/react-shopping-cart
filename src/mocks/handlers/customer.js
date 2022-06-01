import { API_URL } from '@/api/constants';
import { rest } from 'msw';
import { customerList } from '../data/customer';

export const customerHanlders = [
  rest.post(`${API_URL}/customers/signup`, (req, res, ctx) => {
    const { body: customer } = req;

    customerList.current.push(customer);

    return res(res => {
      res.statusText = 'Created';
      return res;
    });
  }),

  rest.post(`${API_URL}/customers/login`, (req, res, ctx) => {
    const { username, password } = req.body;
    // username먼저 확인
    // password 확인
    // 없는 경우
    if (
      customerList.current.some(
        customer => customer.username === username && customer.password === password,
      )
    ) {
      return res(ctx.status(200, 'ok'), ctx.json({ accessToken: 'jwt.token.here' }));
    }
    // username, password가 잘못된 값이 들어왔을 경우 ctx.status(400, 'failed')
    // id password 불일치 401 unauthorized
    //
    return res(ctx.status(400, 'unauthorized'), ctx.json({ error: { message: ['login failed'] } }));
  }),
];
