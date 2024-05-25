import { RecoilRoot, useRecoilValue } from "recoil";
import {
  orderPriceState,
  deliveryFeeState,
  paymentPriceState,
} from "../recoil/selectors/selectors";
import { cartItemsState, selectedListState } from "../recoil/atoms/atoms";
import { renderHook, waitFor } from "@testing-library/react";
import { Suspense } from "react";
import { cartJson } from "./mockData";

describe("쿠폰 테스트", () => {
  it("장바구니 가격 측정", async () => {
    const expectedOrderPrice = 1000 * 5 + 20000 * 1;
    const expectedDeliveryFee = 3000;
    const expectedPaymentPrice = expectedOrderPrice + expectedDeliveryFee;

    const { result } = renderHook(
      () => {
        const orderPrice = useRecoilValue(orderPriceState);
        const deliveryFee = useRecoilValue(deliveryFeeState);
        const paymentPrice = useRecoilValue(paymentPriceState);
        return { orderPrice, deliveryFee, paymentPrice };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(selectedListState, [1284, 1274]);
            }}
          >
            <Suspense>{children}</Suspense>
          </RecoilRoot>
        ),
      }
    );

    await waitFor(() => {
      expect(result.current.orderPrice).toBe(expectedOrderPrice);
      expect(result.current.deliveryFee).toBe(expectedDeliveryFee);
      expect(result.current.paymentPrice).toBe(expectedPaymentPrice);
    });
  });
});
