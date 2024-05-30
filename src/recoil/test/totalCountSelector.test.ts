import { renderHook } from '@testing-library/react';
import { totalCountSelector } from '../selectors';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { dataA, dataB, dataC } from '../../mocks/items';
import { itemDetailsState, itemsState } from '../atoms';
import { CartItems } from '../../types/Item';
import { act } from 'react';

describe('totalCountSelector', () => {
  it('초기 저장된 상품 종류 개수 및 상품 개수는 각각 0이어야 한다.', () => {
    const { result } = renderHook(
      () => {
        const { totalItemTypeCount, totalCount } =
          useRecoilValue(totalCountSelector);
        return { totalItemTypeCount, totalCount };
      },
      { wrapper: RecoilRoot },
    );
    expect(result.current.totalItemTypeCount).toBe(0);
    expect(result.current.totalCount).toBe(0);
  });

  test.each([
    {
      input: [dataA],
      expected: {
        totalItemTypeCount: 1,
        totalCount: 1,
      },
    },
    {
      input: [dataA, dataB, dataC],
      expected: {
        totalItemTypeCount: 3,
        totalCount: 7,
      },
    },
  ])(
    'itemsState에 데이터 $input 를 넣었을 때 상품 종류의 개수와 상품의 총 개수는 $expected이어야 한다.',
    ({ input, expected }) => {
      const { result } = renderHook(
        () => {
          const setItems = useSetRecoilState(itemsState);
          const setItemDetailsList = input.map((data) =>
            useSetRecoilState(itemDetailsState(data.id)),
          );
          const { totalItemTypeCount, totalCount } =
            useRecoilValue(totalCountSelector);
          return {
            setItems,
            setItemDetailsList,
            totalItemTypeCount,
            totalCount,
          };
        },
        {
          wrapper: RecoilRoot,
        },
      );

      act(() => {
        result.current.setItems((preState: CartItems[]) => [
          ...preState,
          ...input,
        ]);
        result.current.setItemDetailsList.forEach((setItemDetails, index) => {
          setItemDetails({
            quantity: input[index].quantity,
            isChecked: true,
          });
        });
      });
      expect(result.current.totalItemTypeCount).toBe(
        expected.totalItemTypeCount,
      );
      expect(result.current.totalCount).toBe(expected.totalCount);
    },
  );
});
