import {
  FailedFetchCartItemListError,
  FailedFetchCouponListError,
  FailedOrderError,
} from '../../error/customError';

export const API_ERROR_STATE_TEST_CASES: TEST_ITEM_PROP<Error | null>[] = [
  { input: null, expected: null },
  {
    input: new FailedFetchCartItemListError(),
    expected: new FailedFetchCartItemListError(),
  },
  {
    input: new FailedFetchCouponListError(),
    expected: new FailedFetchCouponListError(),
  },
  {
    input: new FailedOrderError(),
    expected: new FailedOrderError(),
  },
];
