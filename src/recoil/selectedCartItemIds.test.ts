import { renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedCartItemIdsState } from "./selectedCartItemIds";
import { putInSelectedCartItemIds, takeOutSelectedCartItemIds } from "../utils/sessionStorage";
import { act } from "react";

jest.mock("../utils/sessionStorage");

const mockTakeOutSelectedCartItemIds = takeOutSelectedCartItemIds as jest.Mock;
const mockPutInSelectedCartItemIds = putInSelectedCartItemIds as jest.Mock;

describe("selectedCartItemIdsState", () => {
  const mockSelectedCartItemIds = [1, 2, 3];

  beforeEach(() => {
    mockTakeOutSelectedCartItemIds.mockReset();
  });

  it("초기값 세팅", () => {
    mockTakeOutSelectedCartItemIds.mockReturnValueOnce(mockSelectedCartItemIds);

    const { result } = renderHook(() => useRecoilValue(selectedCartItemIdsState), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toEqual(mockSelectedCartItemIds);
  });

  // set이 발생할 때 세션 스토리지에 동기화가 되는지
  it("스토리지와의 동기화", () => {
    const { result } = renderHook(() => useSetRecoilState(selectedCartItemIdsState), {
      wrapper: RecoilRoot,
    });

    act(() => result.current(mockSelectedCartItemIds));

    expect(mockPutInSelectedCartItemIds).toHaveBeenCalledWith(mockSelectedCartItemIds);
  });
});
