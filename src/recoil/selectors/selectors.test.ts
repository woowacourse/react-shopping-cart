// import { act, renderHook } from "@testing-library/react";
import { useRecoilValue } from "recoil";
import { cartItemsState } from "./selectors";

describe("사용자의 장바구니 목록 조회", () => {
  it("장바구니 목록을 불러온다.", () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const USER_ID = import.meta.env.VITE_USER_ID;
    const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

    const value = useRecoilValue(cartItemsState);
  });
});
