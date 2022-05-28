/* eslint-disable arrow-body-style */
import { rest } from 'msw';

import { MOCK_DB } from 'mocks/db';

const cartDB = MOCK_DB.cart;

const cartHandlers = [
  rest.get('./cart', (req, res, ctx) => {
    return res(ctx.json(cartDB), ctx.set({ 'x-total-count': cartDB.length }));
  }),

  rest.post('./cart', (req, res, ctx) => {
    const insertID = cartDB.length;
    const insertData = { ...req.body, id: insertID };

    cartDB.push(insertData);
    return res(ctx.json(insertData), ctx.set({ 'x-total-count': cartDB.length }));
  }),

  rest.patch('./cart/*', (req, res, ctx) => {
    const targetId = Number(req.params[0]);
    const targetIndex = cartDB.findIndex(({ id }) => id === targetId);

    Object.entries(req.body).forEach(([key, value]) => {
      cartDB[targetIndex][key] = value;
    });

    return res(ctx.json(cartDB[targetIndex]));
  }),

  rest.delete('./cart/*', (req, res, ctx) => {
    const targetId = req.params[0];
    const targetIdList = targetId.indexOf(',') ? targetId.split(',') : [targetId];

    targetIdList.forEach(() => {
      const targetIndex = cartDB.findIndex(({ id }) => id === targetId);
      cartDB.slice(targetIndex, 1);
    });

    return res(ctx.json({}));
  }),
];

export default cartHandlers;
