import { http, HttpResponse } from 'msw';
import mockCart from './mockCart.json';

// const baseUrl =
//   'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com';

// const cartItems: Array<{
//   id: number;
//   productId: number;
//   quantity: number;
//   product: typeof mockCart | null;
// }> = [];

// const cartItemIdCounter = 1;

export const handlers = [
  http.get(`/cart-items`, () => {
    return HttpResponse.json({
      content: mockCart,
    });
  }),

  // http.post(
  //   `${import.meta.env.VITE_API_BASE_URL}/cart-items`,
  //   async ({ request }) => {
  //     const body = (await request.json()) as {
  //       productId: number;
  //       quantity: number;
  //     };

  //     const existingItem = cartItems.find(
  //       (item) => item.productId === body.productId
  //     );

  //     if (existingItem) {
  //       existingItem.quantity += body.quantity;
  //       const product = mockProducts.find(
  //         (p) => p.id === existingItem.productId
  //       );

  //       return HttpResponse.json({
  //         ...existingItem,
  //         product: product || null,
  //       });
  //     } else {
  //       const newCartItem = {
  //         id: cartItemIdCounter++,
  //         productId: body.productId,
  //         quantity: body.quantity,
  //         product: mockProducts.find((p) => p.id === body.productId) || null,
  //       };

  //       cartItems.push(newCartItem);

  //       return HttpResponse.json(newCartItem);
  //     }
  //   }
  // ),

  // http.delete(
  //   `${import.meta.env.VITE_API_BASE_URL}/cart-items/:cartItemId`,
  //   ({ params }) => {
  //     const cartItemId = parseInt(params.cartItemId as string);

  //     const itemIndex = cartItems.findIndex((item) => item.id === cartItemId);

  //     if (itemIndex === -1) {
  //       return new HttpResponse(null, { status: 404 });
  //     }

  //     cartItems.splice(itemIndex, 1);

  //     return new HttpResponse(null, { status: 204 });
  //   }
  // ),

  // http.patch(
  //   `${import.meta.env.VITE_API_BASE_URL}/cart-items/:cartItemId`,
  //   async ({ params, request }) => {
  //     const cartItemId = parseInt(params.cartItemId as string);
  //     const body = (await request.json()) as { quantity: number };

  //     const itemIndex = cartItems.findIndex((item) => item.id === cartItemId);

  //     if (itemIndex === -1) {
  //       return new HttpResponse(null, { status: 404 });
  //     }

  //     if (body.quantity <= 0) {
  //       cartItems.splice(itemIndex, 1);
  //       return new HttpResponse(null, { status: 204 });
  //     }

  //     const item = cartItems[itemIndex];
  //     item.quantity = body.quantity;
  //     const product = mockProducts.find((p) => p.id === item.productId);

  //     return HttpResponse.json({
  //       ...item,
  //       product: product || null,
  //     });
  //   }
  // ),
];
