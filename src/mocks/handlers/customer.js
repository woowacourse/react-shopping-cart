import { API_URL } from '@/api/constants';
import { rest } from 'msw';
import { customerList } from '../data/customer';

export const customerHanlders = [
  rest.get(`${API_URL}/customers`, (req, res, ctx) => {
    const { headers } = req;
    const accessToken = headers['_headers'].authorization.split('Bearer ')[1];

    const customer = customerList.current.find(customer => customer.username === accessToken);

    if (!customer) {
      return res(
        ctx.status(400, 'unauthorized'),
        ctx.json({ error: { messages: ['토큰 정보가 잘 못 되었습니다.'] } }),
      );
    }

    return res(
      ctx.status(200, 'ok'),
      ctx.json({
        customer: {
          username: customer.username,
          phoneNumber: customer.phoneNumber,
          address: customer.address,
        },
      }),
    );
  }),

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

    if (
      customerList.current.some(
        customer => customer.username === username && customer.password === password,
      )
    ) {
      return res(ctx.status(200, 'ok'), ctx.json({ accessToken: username }));
    }

    return res(
      ctx.status(400, 'unauthorized'),
      ctx.json({ error: { messages: ['login failed'] } }),
    );
  }),

  rest.put(`${API_URL}/customers`, (req, res, ctx) => {
    const { phoneNumber, address } = req.body;
    const { headers } = req;

    const accessToken = headers['_headers'].authorization.split('Bearer ')[1];

    if (customerList.current.every(customer => customer.username !== accessToken)) {
      return res(
        ctx.status(401, 'unauthorized'),
        ctx.json({ error: { messages: ['잘못된 토큰 정보입니다.'] } }),
      );
    }

    customerList.current = customerList.current.map(customer => {
      if (customer.username === accessToken) {
        return {
          ...customer,
          phoneNumber,
          address,
        };
      }
      return customer;
    });

    return res(ctx.status(200, 'ok'));
  }),

  rest.patch(`${API_URL}/customers/password`, (req, res, ctx) => {
    const { password } = req.body;
    const { headers } = req;

    const accessToken = headers['_headers'].authorization.split('Bearer ')[1];

    if (customerList.current.every(customer => customer.username !== accessToken)) {
      return res(
        ctx.status(401, 'unauthorized'),
        ctx.json({ error: { messages: ['잘못된 토큰 정보입니다.'] } }),
      );
    }

    customerList.current = customerList.current.map(customer => {
      if (customer.username === accessToken) {
        return {
          ...customer,
          password,
        };
      }
      return customer;
    });

    return res(ctx.status(204, 'no-content'));
  }),

  rest.delete(`${API_URL}/customers`, (req, res, ctx) => {
    const { headers } = req;

    const accessToken = headers['_headers'].authorization.split('Bearer ')[1];

    if (customerList.current.every(customer => customer.username !== accessToken)) {
      return res(
        ctx.status(401, 'unauthorized'),
        ctx.json({ error: { messages: ['잘못된 토큰 정보입니다.'] } }),
      );
    }

    customerList.current = customerList.current.filter(
      customer => customer.username !== accessToken,
    );

    return res(ctx.status(204, 'no-content'));
  }),
];
