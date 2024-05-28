import ERRORMESSAGE from '../constants/errorMessage';

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}

export class FailedDeleteCartItemError extends CustomError {
  constructor() {
    super(ERRORMESSAGE.deleteCartItem);
    this.name = 'FailedDeleteCartItemError';
  }
}

export class FailedSetCartItemQuantityError extends CustomError {
  constructor() {
    super(ERRORMESSAGE.setCartItemQuantity);
    this.name = 'FailedSetCartItemQuantityError';
  }
}

export class FailedFetchCartItemListError extends CustomError {
  constructor() {
    super(ERRORMESSAGE.fetchCartItemList);
    this.name = 'FailedFetchCartItemListError';
  }
}

export class FailedFetchCouponListError extends CustomError {
  constructor() {
    super(ERRORMESSAGE.fetchCouponList);
    this.name = 'FailedFetchCouponListError';
  }
}

export class FailedOrderError extends CustomError {
  constructor() {
    super(ERRORMESSAGE.order);
    this.name = 'FailedOrderError';
  }
}
