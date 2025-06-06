import { CART_ITEMS_DATA } from "@/mocks/datas/cartItems";
import CartItemService from "./CartItemService";

describe("CartItemService", () => {
  let cartItemService: CartItemService;

  beforeEach(() => {
    cartItemService = new CartItemService(CART_ITEMS_DATA.content);
  });

  describe("calculateOrderAmount", () => {
    it("전체 금액의 합산을 계산한다.", () => {
      // 2 * 30,000 + 3 * 5,000 = 75,000
      expect(cartItemService.calculateOrderAmount()).toBe(75_000);
    });

    it("카트가 비어있으면 0을 반환한다.", () => {
      const cartItemService = new CartItemService([]);
      expect(cartItemService.calculateOrderAmount()).toBe(0);
    });
  });
  describe("calculateTotalQuantity", () => {
    it("전체 수량의 합산을 계산한다.", () => {
      // 2 + 3 = 5
      expect(cartItemService.calculateTotalQuantity()).toBe(5);
    });
  });
  describe("calculateTypeCount", () => {
    it("총 종류의 상품 수를 계산한다.", () => {
      // 2개의 상품 종류
      expect(cartItemService.calculateTypeCount()).toBe(2);
    });
  });
  describe("calculateDeliveryFee", () => {
    it("배송비를 계산한다.", () => {
      // 3,000원
      expect(cartItemService.calculateDeliveryFee(false)).toBe(3_000);
    });
  });
  describe("calculateOrderAmountWithDeliveryFee", () => {
    it("배송비를 포함한 총 금액을 계산한다.", () => {
      // 75,000 + 3,000 = 78,000
      expect(cartItemService.calculateOrderAmountWithDeliveryFee(false)).toBe(78_000);
    });
  });
});
