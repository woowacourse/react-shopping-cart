import { http, HttpResponse } from "msw";
import { mockShoppingCartResponse } from "./mockShoppingCartResponse";
import { mockProductResponse } from "./mockProductResponse";
import { CartItemTypes } from "../types/cartItem";

const products = structuredClone(mockProductResponse.content);

let cartItems: CartItemTypes[] = JSON.parse(
  JSON.stringify(mockShoppingCartResponse.content)
);

const resetCartItems = () => {
  cartItems = JSON.parse(JSON.stringify(mockShoppingCartResponse.content));
};

const findProductById = (id: number) => {
  const product = products.find((product) => product.id === id);
  return product;
};

const errorResponse = (errorCode: string, message: string, status: number) => {
  return HttpResponse.json(
    {
      errorCode,
      message,
    },
    { status }
  );
};

const getCartItemsHandler = http.get(
  `${import.meta.env.VITE_BASE_URL}/cart-items`,
  () => {
    return HttpResponse.json({
      ...mockShoppingCartResponse,
      content: cartItems,
    });
  }
);

const postCartItemHandler = http.post(
  `${import.meta.env.VITE_BASE_URL}/cart-items`,
  async ({ request }) => {
    const { productId, quantity } = (await request.json()) as {
      productId: number;
      quantity: number;
    };

    const product = findProductById(productId);

    if (!product)
      return errorResponse(
        "PRODUCT_NOT_FOUND",
        "존재하지 않는 상품입니다.",
        404
      );

    const newItem = {
      id: Date.now(),
      productId,
      quantity,
      product,
    };

    cartItems.push(newItem);

    return HttpResponse.json({ status: 201 });
  }
);

const deleteCartItemHandler = http.delete(
  `${import.meta.env.VITE_BASE_URL}/cart-items/:id`,
  ({ params }) => {
    const id = Number(params.id);
    cartItems = cartItems.filter((item) => item.id !== id);

    return HttpResponse.json({ status: 204 });
  }
);

const patchCartItemHandler = http.patch(
  `${import.meta.env.VITE_BASE_URL}/cart-items/:id`,
  async ({ params, request }) => {
    const id = Number(params.id);
    const { quantity } = (await request.json()) as { quantity: number };

    const item = cartItems.find((item) => item.id === id);

    if (!item)
      return errorResponse(
        "CART_NOT_FOUND",
        "존재하지 않는 장바구니 상품입니다.",
        404
      );

    if (quantity === 0) {
      cartItems = cartItems.filter((item) => item.id !== id);
    } else {
      item.quantity = quantity;
    }

    return HttpResponse.json({ status: 200 });
  }
);

export { resetCartItems };
export const handlers = [
  getCartItemsHandler,
  postCartItemHandler,
  deleteCartItemHandler,
  patchCartItemHandler,
];
