import { render } from "react-dom";
import { renderHook, act } from "@testing-library/react-hooks";
import useSelect from "../src/hooks/useSelect";

describe("useSelect custom Hook 테스트", () => {
  test("selectBox의 아이디가 1인 item을 선택하면 selected에 1이 들어간다.", () => {
    const result = renderHook(() => useSelect());
    console.log(result);
    // expect(result.selected).toEqual(new Set());

    // act(() => result.current.toggleSelectBox(1));
    // expect(result.current.selected).toEqual(new Set([1]));
  });
});
