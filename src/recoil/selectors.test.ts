import { renderHook } from '@testing-library/react';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {
  couponCheckedSelector,
  toggleAllSelector,
  totalCountSelector,
} from './selectors';
import { couponsState, itemDetailsState, itemsState } from './atoms';
import { act } from 'react';
import { Items } from '../types/Item';
import { mockOrderItemsWithDeliveryFee } from '../mocks/orderItems';
import { mockItemDetailsWithDeliveryFee } from '../mocks/itemDetails';
import { mockCoupons } from '../mocks/coupons';

describe('toggleAllSelector', () => {
  it('isChecked가 true인 값을 가진 데이터는 toggleAllSelector get 함수를 실행했을 때 true가 나와야 한다.', () => {
    const { result } = renderHook(
      () => {
        const setItems = useSetRecoilState(itemsState);
        const [itemDetails, setItemDetails] = useRecoilState(
          itemDetailsState(mockOrderItemsWithDeliveryFee[0].id),
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
      result.current.setItems([mockOrderItemsWithDeliveryFee[0]]);
    });

    act(() => {
      result.current.setItemDetails(mockItemDetailsWithDeliveryFee[0]);
    });

    expect(result.current.toggleAllSelectorValue).toBe(true);
  });

  it('toggleAllSelector의 set함수를 실행했을 때 모든 데이터가 newValue가 되어야 한다.', () => {
    const { result } = renderHook(
      () => {
        const setItems = useSetRecoilState(itemsState);
        const [itemDetails, setItemDetails] = useRecoilState(
          itemDetailsState(mockOrderItemsWithDeliveryFee[0].id),
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
      result.current.setItems([mockOrderItemsWithDeliveryFee[0]]);
    });

    act(() => {
      result.current.setItemDetails({
        ...mockItemDetailsWithDeliveryFee[0],
        isChecked: false,
      });
    });

    const expectedValue = true;
    act(() => {
      result.current.setToggleAllSelector(expectedValue);
    });
    expect(result.current.itemDetails.isChecked).toBe(expectedValue);
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
      input: [mockOrderItemsWithDeliveryFee[0]],
      expected: {
        totalItemTypeCount: [mockOrderItemsWithDeliveryFee[0]].length,
        totalCount: mockOrderItemsWithDeliveryFee[0].quantity,
      },
    },
    {
      input: mockOrderItemsWithDeliveryFee,
      expected: {
        totalItemTypeCount: mockOrderItemsWithDeliveryFee.length,
        totalCount: mockOrderItemsWithDeliveryFee.reduce(
          (acc, item) => acc + item.quantity,
          0,
        ),
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
        result.current.setItems((preState: Items[]) => [...preState, ...input]);
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

describe('orderItemsSelector', () => {
  it('itemDetailsState에 isChecked된 atom의 개수와 orderItemsSelector의 반환값이 같아야 한다.', () => {
    mockOrderItemsWithDeliveryFee.forEach((item, index) => {
      const { result: itemResult } = renderHook(
        () => {
          const setItemDetails = useSetRecoilState(itemDetailsState(item.id));
          return { setItemDetails };
        },
        { wrapper: RecoilRoot },
      );

      act(() => {
        itemResult.current.setItemDetails({
          quantity: mockItemDetailsWithDeliveryFee[index].quantity,
          price: mockItemDetailsWithDeliveryFee[index].price,
          isChecked: mockItemDetailsWithDeliveryFee[index].isChecked,
        });
      });
    });
  });
});

describe('couponCheckedSelector', () => {
  it('isChecked가 true인 쿠폰 개수를 반환해야 한다.', () => {
    const { result } = renderHook(
      () => {
        const setCoupons = useSetRecoilState(couponsState);
        const [couponCheckedCount, setCouponChecked] = useRecoilState(
          couponCheckedSelector,
        );
        return { setCoupons, couponCheckedCount, setCouponChecked };
      },
      { wrapper: RecoilRoot },
    );

    act(() => {
      mockCoupons.forEach((coupon) => {
        const newCoupon = {
          ...coupon,
          isChecked: true,
        };
        result.current.setCoupons((prev) => [...prev, newCoupon]);
      });
    });

    expect(result.current.couponCheckedCount).toBe(mockCoupons.length);
  });

  it('id가 1인 쿠폰을 선택하면 couponsState의 id가 1인 쿠폰의 isChecked가 토글되어야 한다.', () => {
    const { result } = renderHook(
      () => {
        const [coupons, setCoupons] = useRecoilState(couponsState);
        const [couponCheckedCount, setCouponChecked] = useRecoilState(
          couponCheckedSelector,
        );
        return { coupons, setCoupons, couponCheckedCount, setCouponChecked };
      },
      { wrapper: RecoilRoot },
    );

    const id = 1;
    act(() => {
      result.current.setCoupons(mockCoupons);
      result.current.setCouponChecked(id);
    });

    expect(
      result.current.coupons.find((coupon) => coupon.id === id)?.isChecked,
    ).toBe(!mockCoupons.find((coupon) => coupon.id === id)?.isChecked);
  });
});
