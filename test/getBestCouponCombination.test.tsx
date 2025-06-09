import { getBestCouponCombination } from '@/features/Coupon/utils/combinations';
import { Coupon } from '@/features/Coupon/types/Coupon.types';
import { CartItem } from '@/features/Cart/types/Cart.types';
import * as discountUtils from '@/features/Coupon/utils/calculateTotalDiscount';
import * as useCartInfoHook from '@/features/Cart/hooks/useCartInfo';
import { vi } from 'vitest';

vi.mock('@/features/Coupon/utils/calculateTotalDiscount', () => ({
  calculateTotalDiscount: vi.fn(),
}));

vi.mock('@/features/Cart/hooks/useCartInfo', () => ({
  useCartInfo: vi.fn(),
}));

describe('getBestCouponCombination', () => {
  const cartItems: CartItem[] = [
    {
      id: 1,
      isChecked: true,
      quantity: 2,
      product: {
        id: 1,
        name: '상품1',
        price: 50000,
        imageUrl: '',
        category: '식료품',
        quantity: 10,
      },
    },
  ];

  const coupons: Coupon[] = [
    {
      id: 1,
      code: 'COUPON1',
      description: '10,000원 할인',
      discountType: 'fixed',
      discount: 10000,
      expirationDate: '2025-12-31',
      checked: false,
      disabled: false,
    },
    {
      id: 2,
      code: 'COUPON2',
      description: '무료 배송 쿠폰',
      discountType: 'freeShipping',
      minimumAmount: 50000,
      expirationDate: '2025-12-31',
      checked: false,
      disabled: false,
    },
    {
      id: 3,
      code: 'COUPON3',
      description: '30% 할인 쿠폰',
      discountType: 'percentage',
      discount: 30,
      expirationDate: '2025-12-31',
      checked: false,
      disabled: false,
    },
  ];

  const priceContext = {
    isRemoteArea: false,
    deliveryFee: 3000,
    totalPrice: 100000,
  };

  beforeEach(() => {
    const mockDiscounts = new Map<string, number>([
      ['1', 10000],
      ['2', 3000],
      ['3', 30000],
      ['1,2', 13000],
      ['1,3', 40000], // 최대 할인
      ['2,3', 33000],
    ]);

    vi.spyOn(useCartInfoHook, 'useCartInfo').mockReturnValue({
        allChecked: true,
        cartItemCount: cartItems.length,
        selectedCartItems: cartItems,
        selectedCartItemCount: cartItems.length,
        selectedTotalAmount: cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        progressValue: 50, 
        remainingForFreeShipping: 0, 
      });
      

    vi.spyOn(discountUtils, 'calculateTotalDiscount').mockImplementation(
      (_items, combo: Coupon[]) => {
        const key = combo.map((c) => c.id).sort().join(',');
        return mockDiscounts.get(key) ?? 0;
      }
    );
  });

  it('할인 금액이 가장 높은 쿠폰 조합을 선택한다.', () => {
    const best = getBestCouponCombination(coupons, cartItems, priceContext);

    const bestIds = best.map((c) => c.id).sort();
    expect(bestIds).toEqual([1, 3]);
  });

  it('조합은 최대 2개까지만 선택된다.', () => {
    const best = getBestCouponCombination(coupons, cartItems, priceContext);
    expect(best.length).toBeLessThanOrEqual(2);
  });

  it('할인 금액이 같은 조합이 여러 개일 경우 먼저 나온 조합을 선택한다.', () => {
    vi.spyOn(discountUtils, 'calculateTotalDiscount').mockImplementation(
      (_items, combo: Coupon[]) => {
        const key = combo.map((c) => c.id).sort().join(',');
        return key === '1,3' || key === '2,3' ? 40000 : 0;
      }
    );

    const best = getBestCouponCombination(coupons, cartItems, priceContext);
    const bestIds = best.map((c) => c.id).sort();
    expect(bestIds).toEqual([1, 3]); 
  });
});
