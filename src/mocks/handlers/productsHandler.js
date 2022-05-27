import { API } from 'constants/api';
import { products, users } from 'mocks/data';
import { rest } from 'msw';
import { findByIdInObjectArray } from 'utils';

const productsHandler = [
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

  rest.get(`/${API.PRODUCT}/:id`, (req, res, ctx) => {
    const { id } = req.params;

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json(findByIdInObjectArray(products, id))
    );
  }),
];

export default productsHandler;
