import { renderHook } from '@testing-library/react';
import { itemDetailsState, itemsState } from '../atoms';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { dataA } from '../../mocks/items';
import { toggleAllSelector } from '../selectors';
import { act } from 'react';

describe('toggleAllSelector', () => {
  it('isChecked가 true인 값을 가진 데이터는 toggleAllSelector get 함수를 실행했을 때 true가 나와야 한다.', () => {
    const { result } = renderHook(
      () => {
        const setItems = useSetRecoilState(itemsState);
        const [itemDetails, setItemDetails] = useRecoilState(
          itemDetailsState(dataA.id),
        );
        const toggleAllSelectorValue = useRecoilValue(toggleAllSelector);
        return {
          setItems,
          itemDetails,
          setItemDetails,
          toggleAllSelectorValue,
        };
      },
      { wrapper: RecoilRoot },
    );

    act(() => {
      result.current.setItems([dataA]);
    });

    act(() => {
      result.current.setItemDetails({
        quantity: 1,
        isChecked: true,
      });
    });

    expect(result.current.toggleAllSelectorValue).toBe(true);
  });

  it('toggleAllSelector의 set함수를 실행했을 때 모든 데이터가 newValue가 되어야 한다.', () => {
    const { result } = renderHook(
      () => {
        const setItems = useSetRecoilState(itemsState);
        const [itemDetails, setItemDetails] = useRecoilState(
          itemDetailsState(dataA.id),
        );
        const setToggleAllSelector = useSetRecoilState(toggleAllSelector);
        return {
          setItems,
          itemDetails,
          setItemDetails,
          setToggleAllSelector,
        };
      },
      { wrapper: RecoilRoot },
    );
    act(() => {
      result.current.setItems([dataA]);
    });

    act(() => {
      result.current.setItemDetails({
        quantity: 1,
        isChecked: false,
      });
    });

    const newValue = true;
    act(() => {
      result.current.setToggleAllSelector(newValue);
    });
    expect(result.current.itemDetails.isChecked).toBe(newValue);
  });
});
