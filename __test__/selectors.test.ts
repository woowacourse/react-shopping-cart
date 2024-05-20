import { renderHook, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { describe, expect, it, vi } from "vitest";
import { fetchCartItems } from "../src/api";
import { FREE_SHIPPING_FEE, SHIPPING_FEE } from "../src/constants";
import { cartItemSelected, cartListState } from "../src/recoil/atoms";
import {
  cartItemAllSelected,
  cartListTotalPrice,
  cartListTotalQuantity,
  shippingFee,
} from "../src/recoil/selectors";
import CartItemLocalStorage, {
  KEY,
} from "../src/services/CartItemLocalStorage";

vi.mock("../src/api", () => ({
  fetchCartItems: vi.fn(),
  initializeCartItemStorage: vi.fn(),
}));

const mockData = [
  {
    id: 172,
    quantity: 3,
    product: {
      id: 3,
      name: "아디다스",
      price: 2000,
      imageUrl:
        "https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg",
      category: "fashion",
    },
  },
  {
    id: 373,
    quantity: 3,
    product: {
      id: 11,
      name: "리복",
      price: 20000,
      imageUrl:
        "https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg",
      category: "fashion",
    },
  },
  {
    id: 200,
    quantity: 10,
    product: {
      id: 13,
      name: "나이키",
      price: 10000,
      imageUrl:
        "https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg",
      category: "fashion",
    },
  },
];

describe("cartListTotalPrice 테스트", () => {
  beforeAll(() => {
    (fetchCartItems as vi.Mock).mockResolvedValue(mockData);
  });

  it("선택된 상품들의 총 가격을 계산한다.", async () => {
    const { result } = renderHook(
      () => {
        const [products, setProducts] = useRecoilState(cartListState);
        const [selected172, setSelected172] = useRecoilState(
          cartItemSelected(172)
        );
        const [selected373, setSelected373] = useRecoilState(
          cartItemSelected(373)
        );
        const [selected200, setSelected200] = useRecoilState(
          cartItemSelected(200)
        );
        const totalOrderAmount = useRecoilValue(cartListTotalPrice);

        useEffect(() => {
          setProducts(mockData);
          setSelected172(true);
          setSelected373(true);
          setSelected200(false);
        }, [setProducts, setSelected172, setSelected373, setSelected200]);

        return { products, totalOrderAmount };
      },
      { wrapper: RecoilRoot }
    );

    await waitFor(() => {
      expect(result.current.products).toEqual(mockData);
      expect(result.current.totalOrderAmount).toEqual(66_000);
    });
  });
});

describe("cartListTotalQuantity 테스트", () => {
  beforeAll(() => {
    (fetchCartItems as vi.Mock).mockResolvedValue(mockData);
  });

  it("장바구니 상품들의 총 수량을 계산한다.", async () => {
    const { result } = renderHook(() => useRecoilValue(cartListTotalQuantity), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current).toBe(16);
    });
  });
});

describe("shippingFee 테스트", () => {
  beforeAll(() => {
    (fetchCartItems as vi.Mock).mockResolvedValue(mockData);
  });

  it("총 가격이 무료 배송 기준 이상이면 무료 배송비를 반환한다.", async () => {
    const { result } = renderHook(
      () => {
        const [products, setProducts] = useRecoilState(cartListState);
        const [selected172, setSelected172] = useRecoilState(
          cartItemSelected(172)
        );
        const [selected373, setSelected373] = useRecoilState(
          cartItemSelected(373)
        );
        const [selected200, setSelected200] = useRecoilState(
          cartItemSelected(200)
        );
        const totalOrderAmount = useRecoilValue(cartListTotalPrice);
        const shippingCost = useRecoilValue(shippingFee);

        useEffect(() => {
          setProducts(mockData);
          setSelected172(true);
          setSelected373(true);
          setSelected200(true);
        }, [setProducts, setSelected172, setSelected373, setSelected200]);

        return { products, totalOrderAmount, shippingCost };
      },
      { wrapper: RecoilRoot }
    );

    await waitFor(() => {
      expect(result.current.products).toEqual(mockData);
      expect(result.current.totalOrderAmount).toEqual(166_000);
      expect(result.current.shippingCost).toEqual(FREE_SHIPPING_FEE);
    });
  });

  it("총 가격이 무료 배송 기준 미만이면 배송비를 반환한다.", async () => {
    const { result } = renderHook(
      () => {
        const [products, setProducts] = useRecoilState(cartListState);
        const [selected172, setSelected172] = useRecoilState(
          cartItemSelected(172)
        );
        const [selected373, setSelected373] = useRecoilState(
          cartItemSelected(373)
        );
        const [selected200, setSelected200] = useRecoilState(
          cartItemSelected(200)
        );
        const totalOrderAmount = useRecoilValue(cartListTotalPrice);
        const shippingCost = useRecoilValue(shippingFee);

        useEffect(() => {
          setProducts(mockData);
          setSelected172(true);
          setSelected373(false);
          setSelected200(false);
        }, [setProducts, setSelected172, setSelected373, setSelected200]);

        return { products, totalOrderAmount, shippingCost };
      },
      { wrapper: RecoilRoot }
    );

    await waitFor(() => {
      expect(result.current.products).toEqual(mockData);
      expect(result.current.totalOrderAmount).toEqual(6000); // 예시 가격
      expect(result.current.shippingCost).toEqual(SHIPPING_FEE);
    });
  });
});

describe("cartItemAllSelected 테스트", () => {
  beforeAll(() => {
    (fetchCartItems as vi.Mock).mockResolvedValue(mockData);
    CartItemLocalStorage.set(KEY, { 172: true, 373: true, 200: true });
  });

  afterAll(() => {
    CartItemLocalStorage.set(KEY, {});
  });

  it("모든 상품이 선택되었는지 확인한다.", async () => {
    const { result } = renderHook(
      () => {
        const [products, setProducts] = useRecoilState(cartListState);
        const [selected172, setSelected172] = useRecoilState(
          cartItemSelected(172)
        );
        const [selected373, setSelected373] = useRecoilState(
          cartItemSelected(373)
        );
        const [selected200, setSelected200] = useRecoilState(
          cartItemSelected(200)
        );
        const allSelected = useRecoilValue(cartItemAllSelected);

        useEffect(() => {
          setProducts(mockData);
          setSelected172(true);
          setSelected373(true);
          setSelected200(true);
        }, [setProducts, setSelected172, setSelected373, setSelected200]);

        return { products, allSelected };
      },
      { wrapper: RecoilRoot }
    );

    await waitFor(() => {
      expect(result.current.products).toEqual(mockData);
      expect(result.current.allSelected).toBe(true);
    });
  });

  it("일부 상품이 선택되지 않았을 때 false를 반환한다.", async () => {
    CartItemLocalStorage.set(KEY, { 172: true, 373: false, 200: true });

    const { result } = renderHook(() => useRecoilValue(cartItemAllSelected), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});
