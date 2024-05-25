import { renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { itemDetailsState, itemsState } from '../atoms';
import { dataA, dataB, dataC } from '../../mocks/items';
import { checkedItemsSelector } from '../selectors';
import { act } from 'react';

describe('checkedItemsSelector', () => {
  it('mockCoupons[0] mockCoupons[2] 선택되었다고 가정할 때 discountType이 freeShipping있어 true을 반환한다..', () => {
    const { result } = renderHook(
      () => {
        const setItems = useSetRecoilState(itemsState);
        const setItemDetailsA = useSetRecoilState(itemDetailsState(dataA.id));
        const setItemDetailsB = useSetRecoilState(itemDetailsState(dataB.id));
        const setItemDetailsC = useSetRecoilState(itemDetailsState(dataC.id));
        const checkedItems = useRecoilValue(checkedItemsSelector);

        return {
          setItems,
          setItemDetailsA,
          setItemDetailsB,
          setItemDetailsC,
          checkedItems,
        };
      },
      { wrapper: RecoilRoot },
    );

    act(() => {
      result.current.setItems([dataA, dataB, dataC]);
    });

    act(() => {
      result.current.setItemDetailsA({
        quantity: dataA.quantity,
        isChecked: true,
      });
      result.current.setItemDetailsB({
        quantity: dataB.quantity,
        isChecked: true,
      });
      result.current.setItemDetailsC({
        quantity: dataC.quantity,
        isChecked: false,
      });
    });

    expect(result.current.checkedItems.length).toBe(2);
  });
});
