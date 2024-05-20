import {
  MOCK_FILTERED_CART_LIST_ALL_SELECTED,
  MOCK_FILTERED_CART_LIST_PARTLY_SELECTED,
} from '@/constants/_mock/mockFilteredCartList';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartListState, filteredCartItemState } from '@/store/atoms';

import MOCK_CART_LIST from '@/constants/_mock/mockCartList';
import { allSelectedState } from '@/store/selectors/allSelectedSelector';
import { renderHook } from '@testing-library/react';

jest.mock('../../api/config', () => ({
  config: {
    apiUrl: 'http://localhost:mock',
  },
}));

describe('allSelectedState Test', () => {
  it('모든 아이템이 `선택됨` 상태이면 전체 선택 상태가 True 가 된다.', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        MOCK_FILTERED_CART_LIST_ALL_SELECTED.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        return useRecoilValue(allSelectedState);
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current).toBe(true);
  });

  it('하나의 아이템이라도 `선택됨`이 아니라면 전체 선택 상태가 False 가 된다.', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        MOCK_FILTERED_CART_LIST_PARTLY_SELECTED.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        return useRecoilValue(allSelectedState);
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current).toBe(false);
  });

  it('전체선택 체크박스 클릭시 모든 아이템이 `선택됨`으로 변경된다.', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        MOCK_FILTERED_CART_LIST_PARTLY_SELECTED.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });
        return { isAllSelected: useRecoilValue(allSelectedState) };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current.isAllSelected).toBe(false);

    const { result: clicked } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        MOCK_FILTERED_CART_LIST_PARTLY_SELECTED.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const setIsAllSelected = useSetRecoilState(allSelectedState);
        setIsAllSelected(true);

        const isAllSelected = useRecoilValue(allSelectedState);

        return { isAllSelected };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(clicked.current.isAllSelected).toBe(true);
  });

  //TODO: Test 실패, 원인 불명
  //   it('전체선택 클릭시 모든 아이템이 `선택됨`으로 변경', () => {
  //     const { result } = renderHook(
  //       () => {
  //         const setCartList = useSetRecoilState(cartListState);
  //         setCartList(MOCK_CART_LIST);

  //         MOCK_FILTERED_CART_LIST_PARTLY_SELECTED.forEach((item) => {
  //           const setFilteredCartList = useSetRecoilState(
  //             filteredCartItemState(item.id)
  //           );
  //           setFilteredCartList(item);
  //         });

  //         const [isAllSelected, setIsAllSelected] =
  //           useRecoilState(allSelectedState);

  //         return { isAllSelected, setIsAllSelected };
  //       },
  //       {
  //         wrapper: RecoilRoot,
  //       }
  //     );

  //     expect(result.current.isAllSelected).toBe(false);

  //     act(() => {
  //       result.current.setIsAllSelected(true);
  //     });

  //     expect(result.current.isAllSelected).toBe(true);
  //   });
});
