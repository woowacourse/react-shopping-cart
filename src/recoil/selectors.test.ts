import { renderHook } from '@testing-library/react';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {
  toggleAllSelector,
  totalCountSelector,
  totalPriceSelector,
} from './selectors';
import { itemDetailsState, itemsState } from './atoms';
import { act } from 'react';
import { Products } from '../types/Product';

const dataA = {
  id: 1,
  quantity: 1,
  product: {
    id: 1,
    name: '나이키',
    price: 500,
    imageUrl: 'sample.com',
    category: 'fashion',
  },
};

const dataB = {
  id: 2,
  quantity: 2,
  product: {
    id: 2,
    name: '뉴발란스',
    price: 7000,
    imageUrl: 'sample.com',
    category: 'fashion',
  },
};

const dataC = {
  id: 3,
  quantity: 4,
  product: {
    id: 3,
    name: '아디다스',
    price: 6000,
    imageUrl: 'sample.com',
    category: 'fashion',
  },
};

describe('totalPriceSelector', () => {
  it('초기 총 가격은 0이어야 한다.', () => {
    const { result } = renderHook(
      () => {
        const { totalAmount, deliveryFee, calculatedTotalAmount } =
          useRecoilValue(totalPriceSelector);
        return { totalAmount, deliveryFee, calculatedTotalAmount };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    expect(result.current.totalAmount).toBe(0);
  });

  test.each([
    {
      input: 99999,
      expected: 102999,
    },
    {
      input: 100000,
      expected: 100000,
    },
  ])(
    '상품 금액이 $input원일 때 총 결제 금액은 $expected원이어야 한다.',
    ({ input, expected }) => {
      const { result } = renderHook(
        () => {
          const { totalAmount, deliveryFee, calculatedTotalAmount } =
            useRecoilValue(totalPriceSelector);
          const setItems = useSetRecoilState(itemsState);
          const setItemDetails = useSetRecoilState(itemDetailsState(1));
          return {
            totalAmount,
            deliveryFee,
            calculatedTotalAmount,
            setItems,
            setItemDetails,
          };
        },
        { wrapper: RecoilRoot },
      );

      const data = {
        id: 1,
        quantity: 1,
        product: {
          id: 1,
          name: '나이키',
          price: input,
          imageUrl: 'sample.com',
          category: 'fashion',
        },
      };

      act(() => {
        result.current.setItems((preState: Products[]) => [...preState, data]);
      });
      act(() => {
        result.current.setItemDetails({
          quantity: data.quantity,
          price: data.product.price,
          isChecked: true,
        });
      });
      expect(result.current.calculatedTotalAmount).toBe(expected);
    },
  );
});

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
        price: 0,
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
        price: 0,
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
        result.current.setItems((preState: Products[]) => [
          ...preState,
          ...input,
        ]);
        result.current.setItemDetailsList.forEach((setItemDetails, index) => {
          setItemDetails({
            quantity: input[index].quantity,
            price: input[index].product.price,
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
