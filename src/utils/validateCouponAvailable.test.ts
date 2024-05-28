import { validateCouponAvailable } from './validateCouponAvailable';
import useSelectedCartItemList from '../hooks/cartItem/useSelectedCartItemList';
import usePrice from '../hooks/price/usePrice';

jest.mock('../hooks/cartItem/useSelectedCartItemList');
jest.mock('../hooks/price/usePrice');

describe('validateCouponAvailable', () => {
  const MOCK_COUPONS: Record<string, Coupon> = {
    FIXED5000: {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      expirationDate: '2024-11-30',
      discount: 5000,
      minimumAmount: 100000,
      discountType: 'fixed',
    },
    BOGO: {
      id: 2,
      code: 'BOGO',
      description: '2개 구매 시 1개 무료 쿠폰',
      expirationDate: '2024-05-30',
      buyQuantity: 2,
      getQuantity: 1,
      discountType: 'buyXgetY',
    },
    FREESHIPPING: {
      id: 3,
      code: 'FREESHIPPING',
      description: '5만원 이상 구매 시 무료 배송 쿠폰',
      expirationDate: '2024-08-31',
      minimumAmount: 50000,
      discountType: 'freeShipping',
    },
    MIRACLESALE: {
      id: 4,
      code: 'MIRACLESALE',
      description: '미라클모닝 30% 할인 쿠폰',
      expirationDate: '2024-07-31',
      discount: 30,
      availableTime: {
        start: '04:00:00',
        end: '07:00:00',
      },
      discountType: 'percentage',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('FIXED5000 쿠폰이 유효한 경우 true를 반환해야 한다.', () => {
    (useSelectedCartItemList as jest.Mock).mockReturnValue({
      selectedCartItemList: [{ id: 1, quantity: 2, price: 100000 }],
    });
    (usePrice as jest.Mock).mockReturnValue({
      orderedPrice: 100000,
      deliveryFee: 3000,
    });

    const result = validateCouponAvailable(MOCK_COUPONS.FIXED5000);
    expect(result).toBe(true);
  });

  it('FIXED5000 쿠폰이 유효하지 않은 경우 false를 반환해야 한다.', () => {
    (useSelectedCartItemList as jest.Mock).mockReturnValue({
      selectedCartItemList: [{ id: 1, quantity: 1, price: 50000 }],
    });
    (usePrice as jest.Mock).mockReturnValue({
      orderedPrice: 50000,
      deliveryFee: 3000,
    });

    const result = validateCouponAvailable(MOCK_COUPONS.FIXED5000);
    expect(result).toBe(false);
  });

  it('BOGO 쿠폰이 유효한 경우 true를 반환해야 한다.', () => {
    (useSelectedCartItemList as jest.Mock).mockReturnValue({
      selectedCartItemList: [{ id: 1, quantity: 3, price: 100000 }],
    });
    (usePrice as jest.Mock).mockReturnValue({
      orderedPrice: 100000,
      deliveryFee: 3000,
    });

    const result = validateCouponAvailable(MOCK_COUPONS.BOGO);
    expect(result).toBe(true);
  });

  it('BOGO 쿠폰이 유효하지 않은 경우 false를 반환해야 한다.', () => {
    (useSelectedCartItemList as jest.Mock).mockReturnValue({
      selectedCartItemList: [{ id: 1, quantity: 1, price: 50000 }],
    });
    (usePrice as jest.Mock).mockReturnValue({
      orderedPrice: 50000,
      deliveryFee: 3000,
    });

    const result = validateCouponAvailable(MOCK_COUPONS.BOGO);
    expect(result).toBe(false);
  });

  it('FREESHIPPING 쿠폰이 유효한 경우 true를 반환해야 한다.', () => {
    (useSelectedCartItemList as jest.Mock).mockReturnValue({
      selectedCartItemList: [{ id: 1, quantity: 2, price: 60000 }],
    });
    (usePrice as jest.Mock).mockReturnValue({
      orderedPrice: 60000,
      deliveryFee: 3000,
    });

    const result = validateCouponAvailable(MOCK_COUPONS.FREESHIPPING);
    expect(result).toBe(true);
  });

  it('FREESHIPPING 쿠폰이 유효하지 않은 경우 false를 반환해야 한다.', () => {
    (useSelectedCartItemList as jest.Mock).mockReturnValue({
      selectedCartItemList: [{ id: 1, quantity: 1, price: 40000 }],
    });
    (usePrice as jest.Mock).mockReturnValue({
      orderedPrice: 40000,
      deliveryFee: 3000,
    });

    const result = validateCouponAvailable(MOCK_COUPONS.FREESHIPPING);
    expect(result).toBe(false);
  });

  it('MIRACLESALE 쿠폰이 유효한 경우 true를 반환해야 한다.', () => {
    const mockDate = new Date('2024-05-26T20:35:10.604Z');
    console.log(mockDate);
    jest.setSystemTime(mockDate);

    (useSelectedCartItemList as jest.Mock).mockReturnValue({
      selectedCartItemList: [{ id: 1, quantity: 2, price: 100000 }],
    });
    (usePrice as jest.Mock).mockReturnValue({
      orderedPrice: 100000,
      deliveryFee: 3000,
    });

    const result = validateCouponAvailable(MOCK_COUPONS.MIRACLESALE);
    expect(result).toBe(true);
  });

  it('MIRACLESALE 쿠폰이 유효하지 않은 경우 false를 반환해야 한다.', () => {
    const mockDate = new Date('2024-05-26T14:27:14.604Z');
    console.log(mockDate);
    jest.setSystemTime(mockDate);

    (useSelectedCartItemList as jest.Mock).mockReturnValue({
      selectedCartItemList: [{ id: 1, quantity: 2, price: 100000 }],
    });
    (usePrice as jest.Mock).mockReturnValue({
      orderedPrice: 100000,
      deliveryFee: 3000,
    });

    const result = validateCouponAvailable(MOCK_COUPONS.MIRACLESALE);
    expect(result).toBe(false);
  });
});
