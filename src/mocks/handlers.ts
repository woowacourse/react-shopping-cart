import { http } from 'msw';
import { mockCartData } from './mockData';
import { Coupon } from '../types/coupon';

interface CartItemProps {
  productId: number;
  quantity: number;
}

const getRequestURL = (url: string) => {
  return `${import.meta.env.VITE_API_BASE_URL}${url}`;
};

// 목 쿠폰 데이터
const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: 'MIRACLESALE',
    description: '특별 할인 30%',
    expirationDate: '2024-12-31',
    discountType: 'percentage',
    discount: 30,
  },
  {
    id: 2,
    code: 'FIXED5000',
    description: '5000원 할인',
    expirationDate: '2024-12-31',
    discountType: 'fixed',
    discount: 5000,
    minimumAmount: 50000,
  },
  {
    id: 3,
    code: 'BOGO',
    description: '하나 사면 하나 무료',
    expirationDate: '2024-12-31',
    discountType: 'buyXgetY',
    buyQuantity: 1,
    getQuantity: 1,
  },
  {
    id: 4,
    code: 'FREESHIPPING',
    description: '무료 배송',
    expirationDate: '2024-12-31',
    discountType: 'freeShipping',
    minimumAmount: 30000,
  },
];

export const handlers = [
  // 쿠폰 목록 조회
  http.get(getRequestURL('/coupons'), async () => {
    return new Response(JSON.stringify(mockCoupons), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  http.get(getRequestURL('/cart-items'), async () => {
    return new Response(JSON.stringify({ content: [...mockCartData] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  http.patch(getRequestURL('/cart-items/:id'), async ({ params, request }) => {
    const { id } = params;

    const updateItem = (await request.json()) as CartItemProps;
    const { quantity } = updateItem;

    const cartIndex = mockCartData.findIndex(
      (cartItem) => cartItem.id === Number(id)
    );

    if (cartIndex === -1) {
      return new Response(
        JSON.stringify({
          errorCode: 'NOT_FOUND',
          message: '상품이 존재하지 않습니다.',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    mockCartData[cartIndex].quantity = quantity;

    return new Response(null, {
      status: 204,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  http.delete(getRequestURL('/cart-items/:id'), async ({ params }) => {
    const { id } = params;
    const cartIndex = mockCartData.findIndex(
      (cartItem) => cartItem.id === Number(id)
    );

    if (cartIndex === -1) {
      return new Response(
        JSON.stringify({
          errorCode: 'NOT_FOUND',
          message: '상품이 존재하지 않습니다.',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    mockCartData.splice(cartIndex, 1);

    return new Response(null, {
      status: 204,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
];
