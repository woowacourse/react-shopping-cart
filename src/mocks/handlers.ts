import { http, HttpResponse } from 'msw';
import { CartItemType } from '../components/features/cart/types';
import cartItemsMockData from './data/mock-cart-items.json';
import couponsMockData from './data/mock-coupons.json';

const baseURL = import.meta.env.VITE_BASE_URL;

// 메모리 내에서 변경 가능한 배열로 복사
let inMemoryCartItems: CartItemType[] = [...cartItemsMockData];

export function resetCartItems() {
  inMemoryCartItems = [...cartItemsMockData];
}

export const handlers = [
  http.get(`${baseURL}/cart-items`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0', 10);
    const size = parseInt(url.searchParams.get('size') || '20', 10);

    const start = page * size;
    const end = start + size;

    const content = inMemoryCartItems.slice(start, end);
    const totalElements = inMemoryCartItems.length;
    const totalPages = Math.ceil(totalElements / size);

    return HttpResponse.json({
      content,
      pageable: {
        pageNumber: 0,
        pageSize: 20,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: true,
      totalElements,
      totalPages,
      size,
      number: 0,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      first: true,
      numberOfElements: 20,
      empty: false,
    });
  }),
  http.delete(`${baseURL}/cart-items/:id`, ({ params }) => {
    const { id } = params;

    inMemoryCartItems = inMemoryCartItems.filter(
      (item) => String(item.id) !== String(id)
    );

    return new HttpResponse(null, { status: 204 });
  }),
  http.patch(`${baseURL}/cart-items/:id`, async ({ params, request }) => {
    const { id } = params;
    const { quantity } = (await request.json()) as { quantity: number };

    inMemoryCartItems = inMemoryCartItems.map((item) =>
      String(item.id) === String(id) ? { ...item, quantity } : item
    );

    return HttpResponse.json(null, { status: 200 });
  }),

  http.get(`${baseURL}/coupons`, () => {
    return HttpResponse.json(couponsMockData, { status: 200 });
  }),
];
