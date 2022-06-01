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
];
