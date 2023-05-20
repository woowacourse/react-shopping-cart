import { get, patch, post, remove } from 'apis/http';
import {
  CreateCartProductResponse,
  DeleteCartProductResponse,
  GetCartProductsResponse,
  GetProductsResponse,
  UpdateCartProductResponse,
} from 'apis/types';
import { CartProduct, Product } from 'types/product';

export const API_BASE = 'api';

export const api = {
  // 상품 목록 조회
  getProducts(): Promise<GetProductsResponse> {
    const products = get(`${API_BASE}/products`);

    return products;
  },

  // 장바구니 아이템 목록 조회
  getCartProducts(): Promise<GetCartProductsResponse> {
    const cartProducts = get(`${API_BASE}/cart-items`);

    return cartProducts;
  },

  // 장바구니 아이템 추가
  createCartProduct(productId: Product['id']): Promise<CreateCartProductResponse> {
    const response = post(`${API_BASE}/cart-items`, {
      body: JSON.stringify({ productId }),
    });

    return response;
  },

  // 장바구니 아이템 수량 변경
  updateCartProductQuantity(
    cartProductId: CartProduct['id'],
    quantity: CartProduct['quantity']
  ): Promise<UpdateCartProductResponse> {
    const response = patch(`${API_BASE}/cart-items/${cartProductId}`, {
      body: JSON.stringify({ quantity }),
    });

    return response;
  },

  // 장바구니 아이템 삭제
  deleteCartProduct(cartProductId: CartProduct['id']): Promise<DeleteCartProductResponse> {
    const response = remove(`${API_BASE}/cart-items/${cartProductId}`);

    return response;
  },
};
