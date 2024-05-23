import { renderHook, act } from "@testing-library/react";
import { RecoilRoot, useRecoilState } from "recoil";
import { cartItemCheckedState } from "../store/atom/atoms";
import { getStorage } from "../store/localStorage/localStorage";

describe("itemEachCheckState", () => {
  const LOCAL_STORAGE_KEY = "itemCheckedMap";

  beforeEach(() => {
    // 테스트 전에 localStorage를 초기화합니다.
    localStorage.clear();
  });

  it("itemEachCheckState 변경시, localStorage의 상태도 변경되어야 한다.", () => {
    //Arrange
    const itemId = 123;
    const { result } = renderHook(() => useRecoilState(cartItemCheckedState(itemId)), {
      wrapper: RecoilRoot,
    });
    const [checked, setChecked] = result.current;
    expect(checked).toBe(true);

    //Act
    act(() => {
      setChecked(false);
    });

    //Assert
    const localData = getStorage<CartItemCheckedStateInStorage>(LOCAL_STORAGE_KEY, {});
    expect(result.current[0]).toBe(false);
    expect(localData[itemId]).toBe(false);
  });
});
