import {
  FailedDeleteCartItemError,
  FailedSetCartItemQuantityError,
  FailedFetchCartItemListError,
  FailedFetchCouponListError,
  FailedOrderError,
} from './customError';
import ERRORMESSAGE from '../constants/errorMessage';

describe('CustomError Classes', () => {
  it('FailedDeleteCartItemError는 정확한 메세지와 이름을 가져야 한다.', () => {
    const error = new FailedDeleteCartItemError();
    expect(error.message).toBe(ERRORMESSAGE.deleteCartItem);
    expect(error.name).toBe('FailedDeleteCartItemError');
  });

  it('FailedSetCartItemQuantityError는 정확한 메세지와 이름을 가져야 한다.', () => {
    const error = new FailedSetCartItemQuantityError();
    expect(error.message).toBe(ERRORMESSAGE.setCartItemQuantity);
    expect(error.name).toBe('FailedSetCartItemQuantityError');
  });

  it('FailedFetchCartItemListError는 정확한 메세지와 이름을 가져야 한다.', () => {
    const error = new FailedFetchCartItemListError();
    expect(error.message).toBe(ERRORMESSAGE.fetchCartItemList);
    expect(error.name).toBe('FailedFetchCartItemListError');
  });

  it('FailedFetchCouponListError는 정확한 메세지와 이름을 가져야 한다.', () => {
    const error = new FailedFetchCouponListError();
    expect(error.message).toBe(ERRORMESSAGE.fetchCouponList);
    expect(error.name).toBe('FailedFetchCouponListError');
  });

  it('FailedOrderError는 정확한 메세지와 이름을 가져야 한다.', () => {
    const error = new FailedOrderError();
    expect(error.message).toBe(ERRORMESSAGE.order);
    expect(error.name).toBe('FailedOrderError');
  });
});
