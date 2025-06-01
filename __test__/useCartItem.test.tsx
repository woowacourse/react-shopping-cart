import { useCartItem } from "@/hooks";
import { QueryProvider } from "@/modules";
import { act, renderHook, waitFor } from "@testing-library/react";

describe("useCartItem", () => {
  describe("정상 케이스", () => {
    it("productsStatus, cartItemsStatus, products, cartItems 값을 불러온다.", async () => {
      const { result } = await act(async () =>
        renderHook(() => useCartItem(), {
          wrapper: ({ children }) => <QueryProvider>{children}</QueryProvider>,
        }),
      );
      await waitFor(() => {
        expect(result.current.productsStatus).toBe("success");
        expect(result.current.cartItemsStatus).toBe("success");
      });

      expect(result.current.products.content).toBeDefined();
      expect(result.current.cartItems.content).toBeDefined();
    });

    it("increaseCartItem: 장바구니에 없는 상품을 추가하면 cartItems에 추가된다.", async () => {
      const { result } = await act(async () =>
        renderHook(() => useCartItem(), {
          wrapper: ({ children }) => <QueryProvider>{children}</QueryProvider>,
        }),
      );

      await waitFor(() => {
        expect(result.current.productsStatus).toBe("success");
        expect(result.current.cartItemsStatus).toBe("success");
      });

      const productId = result.current.products.content[0].id;
      await act(async () => {
        await result.current.increaseCartItem(productId);
      });

      expect(result.current.cartItems.content.some((item) => item.product?.id === productId)).toBe(true);
    });

    it("increaseCartItem: 이미 있는 상품의 수량이 1 증가한다.", async () => {
      const { result } = await act(async () =>
        renderHook(() => useCartItem(), {
          wrapper: ({ children }) => <QueryProvider>{children}</QueryProvider>,
        }),
      );

      await waitFor(() => {
        expect(result.current.productsStatus).toBe("success");
        expect(result.current.cartItemsStatus).toBe("success");
      });

      const productId = result.current.cartItems.content[0].product.id;
      const prevQuantity = result.current.cartItems.content[0].quantity;

      await act(async () => {
        await result.current.increaseCartItem(productId);
      });

      const updatedItem = result.current.cartItems.content.find((item) => item.product.id === productId);
      if (!updatedItem) return;

      expect(updatedItem.quantity).toBe(prevQuantity + 1);
    });

    it("decreaseCartItem: 수량이 2 이상인 상품을 감소시키면 수량이 1 감소한다.", async () => {
      const { result } = await act(async () =>
        renderHook(() => useCartItem(), {
          wrapper: ({ children }) => <QueryProvider>{children}</QueryProvider>,
        }),
      );

      await waitFor(() => {
        expect(result.current.productsStatus).toBe("success");
        expect(result.current.cartItemsStatus).toBe("success");
      });

      const item = result.current.cartItems.content.find((i) => i.quantity > 1);
      if (!item) return;

      const prevQuantity = item.quantity;
      await act(async () => {
        await result.current.decreaseCartItem(item.product.id);
      });

      const updatedItem = result.current.cartItems.content.find((i) => i.product.id === item.product.id);

      if (!updatedItem) return;

      expect(updatedItem.quantity).toBe(prevQuantity - 1);
    });

    it("decreaseCartItem: 수량이 1인 상품을 감소시키면 cartItems에서 삭제된다.", async () => {
      const { result } = await act(async () =>
        renderHook(() => useCartItem(), {
          wrapper: ({ children }) => <QueryProvider>{children}</QueryProvider>,
        }),
      );

      await waitFor(() => {
        expect(result.current.productsStatus).toBe("success");
        expect(result.current.cartItemsStatus).toBe("success");
      });

      const item = result.current.cartItems.content.find((i) => i.quantity === 1);
      if (!item) return;

      await act(async () => {
        await result.current.decreaseCartItem(item.product.id);
      });

      expect(result.current.cartItems.content.some((i) => i.product.id === item.product.id)).toBe(false);
    });
  });
  // describe.only("예외 케이스", () => {
  //   it("increaseCartItem: 재고 수량을 초과하여 담을 수 없다.", async () => {
  //     const { result } = await act(async () =>
  //       renderHook(() => useCartItem(), {
  //         wrapper: ({ children }) => (
  //           <ErrorProvider>
  //             <ErrorPopup />
  //             <QueryProvider>{children}</QueryProvider>
  //           </ErrorProvider>
  //         ),
  //       }),
  //     );

  //     await waitFor(() => {
  //       expect(result.current.productsStatus).toBe("success");
  //       expect(result.current.cartItemsStatus).toBe("success");
  //     });

  //     const productId = result.current.products.content[0].id;
  //     for (let i = 0; i < 15; i++) {
  //       await act(async () => {
  //         await result.current.increaseCartItem(productId);
  //       });
  //       await waitFor(() => {
  //         const item = result.current.cartItems.content.find((i) => i.product.id === productId);
  //         expect(item?.quantity ?? 0).toBeLessThanOrEqual(i + 1);
  //       });
  //     }

  //     expect(screen.getByText("재고가 부족합니다.")).toBeDefined();
  //   });
  // });
});
