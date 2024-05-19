import { sumCartOrderAmount } from ".";
import { CartItem, Product } from "../../../types/cartItems";

const MOCK_PRODUCT_BASE: Omit<Product, "price"> = {
  id: 1,
  name: "test",
  imageUrl: "test",
  category: "test",
};
describe("sumCartOrderAmount", () => {
  test("장바구니 상품 목록이 비어있을 경우 0을 반환한다.", () => {
    const cartItems: CartItem[] = [];
    const result = sumCartOrderAmount(cartItems);
    expect(result).toBe(0);
  });

  test("선택된 장바구니 상품이 없을 경우 0을 반환한다.", () => {
    const cartItems: CartItem[] = [
      { id: 0, isSelected: false, quantity: 1, product: { price: 100, ...MOCK_PRODUCT_BASE } },
      { id: 1, isSelected: false, quantity: 2, product: { price: 200, ...MOCK_PRODUCT_BASE } },
    ];
    const result = sumCartOrderAmount(cartItems);
    expect(result).toBe(0);
  });

  test("선택된 장바구니 상품에 대해서만 금액을 합산한다.", () => {
    const cartItems: CartItem[] = [
      { id: 0, isSelected: true, quantity: 1, product: { price: 100, ...MOCK_PRODUCT_BASE } },
      { id: 1, isSelected: false, quantity: 2, product: { price: 200, ...MOCK_PRODUCT_BASE } },
      { id: 2, isSelected: true, quantity: 3, product: { price: 50, ...MOCK_PRODUCT_BASE } },
    ];
    const result = sumCartOrderAmount(cartItems);
    expect(result).toBe(250); // 1*100 + 3*50 = 100 + 150 = 250
  });

  test("수량이 0인 상품에 대해서는 금액을 합산하지 않는다.", () => {
    const cartItems: CartItem[] = [
      { id: 0, isSelected: true, quantity: 0, product: { price: 100, ...MOCK_PRODUCT_BASE } },
      { id: 1, isSelected: true, quantity: 2, product: { price: 200, ...MOCK_PRODUCT_BASE } },
      { id: 2, isSelected: true, quantity: 3, product: { price: 50, ...MOCK_PRODUCT_BASE } },
    ];
    const result = sumCartOrderAmount(cartItems);
    expect(result).toBe(550); // 0*100 + 2*200 3*50 = 0 + 400 + 150 = 550
  });
});
