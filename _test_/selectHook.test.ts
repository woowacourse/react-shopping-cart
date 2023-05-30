import { renderHook, act } from "@testing-library/react";
import useSelect from "../src/hooks/useSelect";

describe("useSelect custom hook 의 toggleSelectBox 테스트", () => {
  test("selectBox의 아이디가 1인 item을 선택하면 selected에 1이 들어간다.", () => {
    const { result } = renderHook(() => useSelect());

    expect(result.current.selected).toEqual(new Set());

    act(() => result.current.toggleSelectBox(1));

    expect(result.current.selected).toEqual(new Set([1]));
  });

  test("아이디가 존재하는 selectBox에 같은 아이디 item을 다시 선택하면 selected에서 제거된다.", () => {
    const { result } = renderHook(() => useSelect());

    expect(result.current.selected).toEqual(new Set());

    act(() => result.current.toggleSelectBox(1));

    expect(result.current.selected).toEqual(new Set([1]));

    act(() => result.current.toggleSelectBox(1));

    expect(result.current.selected).toEqual(new Set());
  });
});

describe("useSelect custom hook 의 toggleAll 테스트", () => {
  test("전체가 선택되어있지 않을 때 전체를 선택하면 모든 아이디가 selected에 들어온다.", () => {
    const { result } = renderHook(() => useSelect());
    const options = [1, 2, 3];

    expect(result.current.selected).toEqual(new Set());

    act(() => result.current.toggleAll(options));

    expect(result.current.selected).toEqual(new Set(options));
  });

  test("전체가 선택되어있을 때 전체를 선택하면 모든 아이디가 selected가 비워진다.", () => {
    const { result } = renderHook(() => useSelect());
    const options = [1, 2, 3];

    expect(result.current.selected).toEqual(new Set());

    act(() => result.current.toggleAll(options));

    expect(result.current.selected).toEqual(new Set(options));

    act(() => result.current.toggleAll(options));

    expect(result.current.selected).toEqual(new Set());
  });
});

describe("useSelect custom hook 의 deleteId 테스트", () => {
  test("인자로 들어온 id가 selected에서 delete된다.", () => {
    const { result } = renderHook(() => useSelect());

    act(() => result.current.toggleSelectBox(1));

    act(() => result.current.deleteId(1));

    expect(result.current.selected).toEqual(new Set());
  });
});
